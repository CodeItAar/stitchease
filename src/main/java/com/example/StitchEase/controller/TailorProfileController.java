package com.example.StitchEase.controller;

import com.example.StitchEase.dto.TailorProfileDTO;
import com.example.StitchEase.model.Design;
import com.example.StitchEase.model.TailorProfile;
import com.example.StitchEase.repository.DesignRepository;
import com.example.StitchEase.repository.TailorProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class TailorProfileController {

    @Autowired
    private TailorProfileRepository tailorProfileRepository;

    @Autowired
    private DesignRepository designRepository;

    @GetMapping("/profile")
    public TailorProfileDTO getTailorProfile() {
        // Normally we'd get the logged-in user's ID. 
        // For demonstration, we'll try to get profile with ID 1, or just return mock data.
        
        List<TailorProfile> profiles = tailorProfileRepository.findAll();
        TailorProfileDTO dto = new TailorProfileDTO();
        
        if (profiles.isEmpty()) {
            // Return exactly the mock data requested in the design
            dto.setShopName("Aarthi's Tailoring & Embroidery");
            dto.setEstablishedYear(2006);
            dto.setLocation("Chennai, India");
            dto.setDescription("Rooted in the rich textile heritage of South India, we specialize in bespoke bridal wear, intricate Zardozi work, and contemporary silhouettes. Every garment is a testament to meticulous craftsmanship, ensuring a perfect fit that celebrates individual style. Our atelier combines traditional hand-embroidery techniques with modern tailoring precision.");
            
            dto.setGovernmentIdVerified(true);
            dto.setTradeLicenseVerified(true);
            dto.setGstinVerified(true);
            dto.setPremiumPartner(true);
            
            dto.setExperienceYears("15+ Years of Excellence");
            dto.setStandardLeadTime("5-7 Days");
            dto.setCustomLeadTime("15-20 Days");
            
            dto.setCoreSpecializations(Arrays.asList("Zardozi Work", "Hand Embroidery", "Bespoke Fitting"));
            
            dto.setBankAccount("HDFC **** **** 4092");
            dto.setUpiId("Aarthitailors@okaxis");
        } else {
            TailorProfile p = profiles.get(0);
            dto.setShopName(p.getShopName());
            dto.setEstablishedYear(p.getEstablishedYear());
            dto.setLocation(p.getLocation());
            dto.setDescription(p.getDescription());
            
            dto.setGovernmentIdVerified(p.isGovernmentIdVerified());
            dto.setTradeLicenseVerified(p.isTradeLicenseVerified());
            dto.setGstinVerified(p.isGstinVerified());
            dto.setPremiumPartner(p.isPremiumPartner());
            
            dto.setExperienceYears(p.getExperienceYears());
            dto.setStandardLeadTime(p.getStandardLeadTime());
            dto.setCustomLeadTime(p.getCustomLeadTime());
            
            if (p.getCoreSpecializations() != null && !p.getCoreSpecializations().isEmpty()) {
                dto.setCoreSpecializations(Arrays.asList(p.getCoreSpecializations().split(",")));
            }
            
            dto.setBankAccount(p.getBankAccount());
            dto.setUpiId(p.getUpiId());
        }

        // Fetch dynamic designs for portfolio highlights
        List<Design> latestDesigns = designRepository.findAll();
        List<TailorProfileDTO.PortfolioImageDTO> portfolio = latestDesigns.stream()
                .limit(4) // Get only 4 images for highlights
                .map(d -> new TailorProfileDTO.PortfolioImageDTO(d.getId(), d.getSampleImage(), d.getTitle()))
                .collect(Collectors.toList());
        
        dto.setPortfolioHighlights(portfolio);
        
        return dto;
    }
}
