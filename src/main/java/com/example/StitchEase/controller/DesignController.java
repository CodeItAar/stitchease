package com.example.StitchEase.controller;

import com.example.StitchEase.model.Design;
import com.example.StitchEase.repository.DesignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designs")
@CrossOrigin(origins = "*")
public class DesignController {

    @Autowired
    private DesignRepository designRepository;

    @GetMapping("/filter")
    public List<Design> getFilteredDesigns(
            @RequestParam(required = false) String age,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String outfit
    ) {
        return designRepository.filterDesigns(
                (age != null && !age.isEmpty()) ? age : null,
                (gender != null && !gender.isEmpty()) ? gender : null,
                (category != null && !category.isEmpty()) ? category : null,
                (outfit != null && !outfit.isEmpty()) ? outfit : null
        );
    }
}