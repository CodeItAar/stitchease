package com.example.StitchEase.controller;

import com.example.StitchEase.exception.ResourceNotFoundException;
import com.example.StitchEase.model.Design;
import com.example.StitchEase.repository.DesignRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import com.example.StitchEase.model.DesignColorVariant;
import com.example.StitchEase.model.User;
import com.example.StitchEase.repository.DesignColorVariantRepository;

@RestController
@RequestMapping("/api/designs")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
@Tag(name = "Design Controller", description = "APIs for viewing, filtering, and managing catalog designs")
public class DesignController {

    private static final String UPLOAD_DIR = "uploads/";

    // Final variable for immutable dependency injection
    private final DesignRepository designRepository;
    private final DesignColorVariantRepository designColorVariantRepository;
    private final com.example.StitchEase.repository.TailorProfileRepository tailorProfileRepository;
    private final com.example.StitchEase.repository.DesignPersonalizeDetailRepository designPersonalizeDetailRepository;

    // Constructor Injection (Fixes 'Field injection is not recommended' warning)
    public DesignController(DesignRepository designRepository, DesignColorVariantRepository designColorVariantRepository, com.example.StitchEase.repository.TailorProfileRepository tailorProfileRepository, com.example.StitchEase.repository.DesignPersonalizeDetailRepository designPersonalizeDetailRepository) {
        this.designRepository = designRepository;
        this.designColorVariantRepository = designColorVariantRepository;
        this.tailorProfileRepository = tailorProfileRepository;
        this.designPersonalizeDetailRepository = designPersonalizeDetailRepository;
    }

    // Public: Fetch all catalog designs
    @Operation(summary = "Get all designs")
    @GetMapping("")
    public ResponseEntity<List<Design>> getAllDesigns() {
        List<Design> designs = designRepository.findAll();
        populateTailorDetails(designs);
        return ResponseEntity.ok(designs);
    }

    // Public: Fetch a specific design by ID
    @Operation(summary = "Get design by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Design> getDesignById(@PathVariable Long id) {
        Design design = designRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with ID: " + id));
        return ResponseEntity.ok(design);
    }

    // Public: Filter designs by options
    @Operation(summary = "Filter designs by demography, gender, category, or outfit type")
    @GetMapping("/filter")
    public List<Design> getFilteredDesigns(
            @RequestParam(required = false) String age,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String outfit
    ) {
        List<Design> designs = designRepository.filterDesigns(
                (age != null && !age.isEmpty()) ? age : null,
                (gender != null && !gender.isEmpty()) ? gender : null,
                (category != null && !category.isEmpty()) ? category : null,
                (outfit != null && !outfit.isEmpty()) ? outfit : null
        );
        populateTailorDetails(designs);
        return designs;
    }

    // Admin/Tailor: Upload new design card with JPG/JPEG/PNG file
    @Operation(summary = "Upload a new design with an image file (JPG, JPEG, PNG)")
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createDesign(
            @RequestParam(value = "tailorId", required = false) Long tailorId,
            @RequestParam("title") String title,
            @RequestParam("category") String category,
            @RequestParam("ageDemographics") String ageDemographics,
            @RequestParam("gender") String gender,
            @RequestParam("outfitType") String outfitType,
            @RequestParam("basePrice") Double basePrice,
            @RequestParam("image") MultipartFile imageFile) {

        try {
            String imageUrl = saveImageFile(imageFile);

            Design design = new Design();
            design.setTitle(title);
            design.setCategory(category);
            design.setAgeDemographics(ageDemographics);
            design.setGender(gender);
            design.setOutfitType(outfitType);
            design.setBasePrice(basePrice);
            design.setSampleImage(imageUrl);

            if (tailorId != null) {
                com.example.StitchEase.model.User tailor = new com.example.StitchEase.model.User();
                tailor.setId(tailorId);
                design.setTailor(tailor);
            }

            Design savedDesign = designRepository.save(design);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDesign);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image file: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Admin/Tailor: Edit existing design metadata
    @Operation(summary = "Update an existing design")
    @PutMapping("/{id}")
    public ResponseEntity<Design> updateDesign(@PathVariable Long id, @RequestBody Design updatedDesign) {
        Design existingDesign = designRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with ID: " + id));

        existingDesign.setTitle(updatedDesign.getTitle());
        existingDesign.setCategory(updatedDesign.getCategory());
        existingDesign.setAgeDemographics(updatedDesign.getAgeDemographics());
        existingDesign.setGender(updatedDesign.getGender());
        existingDesign.setOutfitType(updatedDesign.getOutfitType());
        existingDesign.setBasePrice(updatedDesign.getBasePrice());

        if (updatedDesign.getSampleImage() != null && !updatedDesign.getSampleImage().isEmpty()) {
            existingDesign.setSampleImage(updatedDesign.getSampleImage());
        }

        Design saved = designRepository.save(existingDesign);
        return ResponseEntity.ok(saved);
    }

    // Admin/Tailor: Delete design card
    @Operation(summary = "Delete a design card")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDesign(@PathVariable Long id) {
        Design design = designRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with ID: " + id));

        designRepository.delete(design);
        return ResponseEntity.ok("Design deleted successfully");
    }

    // Admin/Tailor: Add color variant
    @Operation(summary = "Add a color variant to a design")
    @PostMapping(value = "/{id}/colors", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addColorVariant(
            @PathVariable Long id,
            @RequestParam("colorName") String colorName,
            @RequestParam("colorHex") String colorHex,
            @RequestParam("image") MultipartFile imageFile) {

        try {
            Design design = designRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Design not found with ID: " + id));

            String imageUrl = saveImageFile(imageFile);

            DesignColorVariant variant = new DesignColorVariant();
            variant.setColorName(colorName);
            variant.setColorHex(colorHex);
            variant.setImageUrl(imageUrl);
            variant.setDesign(design);

            DesignColorVariant savedVariant = designColorVariantRepository.save(variant);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedVariant);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image file: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Admin/Tailor: Delete color variant
    @Operation(summary = "Delete a color variant from a design")
    @DeleteMapping("/{id}/colors/{colorId}")
    public ResponseEntity<Void> deleteColorVariant(@PathVariable Long id, @PathVariable Long colorId) {
        Design design = designRepository.findById(id).orElse(null);
        if (design == null) {
            return ResponseEntity.notFound().build();
        }

        designColorVariantRepository.deleteById(colorId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Add a personalize detail to a design")
    @PostMapping("/{id}/personalize")
    public ResponseEntity<com.example.StitchEase.model.DesignPersonalizeDetail> addPersonalizeDetail(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam Double priceModifier) {
        Design design = designRepository.findById(id).orElse(null);
        if (design == null) {
            return ResponseEntity.notFound().build();
        }

        com.example.StitchEase.model.DesignPersonalizeDetail detail = new com.example.StitchEase.model.DesignPersonalizeDetail();
        detail.setDesign(design);
        detail.setName(name);
        detail.setPriceModifier(priceModifier);

        com.example.StitchEase.model.DesignPersonalizeDetail savedDetail = designPersonalizeDetailRepository.save(detail);
        return ResponseEntity.ok(savedDetail);
    }

    @Operation(summary = "Delete a personalize detail from a design")
    @DeleteMapping("/{id}/personalize/{detailId}")
    public ResponseEntity<Void> deletePersonalizeDetail(@PathVariable Long id, @PathVariable Long detailId) {
        Design design = designRepository.findById(id).orElse(null);
        if (design == null) {
            return ResponseEntity.notFound().build();
        }

        designPersonalizeDetailRepository.deleteById(detailId);
        return ResponseEntity.ok().build();
    }

    // Helper method using modern Java NIO (Fixes 'Result of File.mkdirs() is ignored' warning)
    private String saveImageFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Image file cannot be empty");
        }

        String fileName = file.getOriginalFilename();
        if (fileName == null || (
                !fileName.toLowerCase().endsWith(".jpg") &&
                        !fileName.toLowerCase().endsWith(".jpeg") &&
                        !fileName.toLowerCase().endsWith(".png"))) {
            throw new IllegalArgumentException("Only .jpg, .jpeg, and .png files are allowed!");
        }

        // Creates directory if missing without ignored return value warning
        Path uploadPath = Paths.get(UPLOAD_DIR);
        Files.createDirectories(uploadPath);

        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(uniqueFileName)
                .toUriString();
    }

    private void populateTailorDetails(List<Design> designs) {
        if (designs == null || designs.isEmpty()) return;
        List<Long> tailorIds = designs.stream()
                .map(Design::getTailor)
                .filter(java.util.Objects::nonNull)
                .map(com.example.StitchEase.model.User::getId)
                .distinct()
                .collect(java.util.stream.Collectors.toList());

        if (tailorIds.isEmpty()) return;

        List<com.example.StitchEase.model.TailorProfile> profiles = tailorProfileRepository.findAll();
        java.util.Map<Long, com.example.StitchEase.model.TailorProfile> profileMap = profiles.stream()
                .filter(p -> p.getUser() != null)
                .collect(java.util.stream.Collectors.toMap(p -> p.getUser().getId(), p -> p, (p1, p2) -> p1));

        for (Design design : designs) {
            if (design.getTailor() != null) {
                design.setTailorName(design.getTailor().getName());
                com.example.StitchEase.model.TailorProfile profile = profileMap.get(design.getTailor().getId());
                if (profile != null) {
                    design.setShopName(profile.getShopName());
                    design.setLocation(profile.getLocation());
                }
            }
        }
    }
}