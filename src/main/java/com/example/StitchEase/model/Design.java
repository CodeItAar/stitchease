package com.example.StitchEase.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "designs")
@Data
public class Design {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed to Long with auto-generation

    private String title;
    private String category;
    private String ageDemographics;
    private String gender;
    private String outfitType;
    private Double basePrice; // Changed from String to Double for numeric consistency
    private String sampleImage;
}