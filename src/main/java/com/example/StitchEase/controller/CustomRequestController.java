package com.example.StitchEase.controller;

import com.example.StitchEase.model.CustomRequest;
import com.example.StitchEase.model.User;
import com.example.StitchEase.repository.CustomRequestRepository;
import com.example.StitchEase.repository.UserRepository;
import com.example.StitchEase.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/custom-requests")
@CrossOrigin(origins = "*")
public class CustomRequestController {

    @Autowired
    private CustomRequestRepository customRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<?> createCustomRequest(
            @RequestParam("userId") Long userId,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) {

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String imageUrl = fileStorageService.saveFile(image);

            CustomRequest request = new CustomRequest();
            request.setUser(user);
            request.setDescription(description);
            request.setImageUrl(imageUrl);

            CustomRequest saved = customRequestRepository.save(request);
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to upload image: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CustomRequest>> getRequestsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(customRequestRepository.findByUserId(userId));
    }
}