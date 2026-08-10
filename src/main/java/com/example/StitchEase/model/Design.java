package com.example.StitchEase.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "designs")
@Data
public class Design {
    @Id
    private String id;
    private String title;
    private String category;
    private String ageDemographics;
    private String gender;
    private String outfitType;
    private String basePrice;
    private String sampleImage;
}