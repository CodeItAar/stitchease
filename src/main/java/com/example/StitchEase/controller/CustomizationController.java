package com.example.StitchEase.controller;

import com.example.StitchEase.model.CustomizationOption;
import com.example.StitchEase.repository.CustomizationOptionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customizations")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
@Tag(name = "Customization Controller", description = "APIs for fetching customization options")
public class CustomizationController {

    private final CustomizationOptionRepository repository;

    public CustomizationController(CustomizationOptionRepository repository) {
        this.repository = repository;
    }

    @Operation(summary = "Get all customization options")
    @GetMapping("")
    public ResponseEntity<List<CustomizationOption>> getAllCustomizations() {
        return ResponseEntity.ok(repository.findAll());
    }
}
