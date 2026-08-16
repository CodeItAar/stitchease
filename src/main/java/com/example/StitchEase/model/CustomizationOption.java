package com.example.StitchEase.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "customization_options")
@Data
public class CustomizationOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category; // FABRIC, COLOR, DETAIL
    private String name; // e.g. "Premium Velvet", "Deep Maroon", "Satin Lining"
    private String colorHex; // Only for COLOR category, e.g. "#6a0dad"
    private Double priceModifier; // e.g. 1500, 500, 300
    private String imageUrl; // For previewing the design with this customization applied
}
