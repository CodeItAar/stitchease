package com.example.StitchEase.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import com.example.StitchEase.model.User;
@Entity
@Table(name = "designs")
@Data
public class Design {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Changed to Long with auto-generation

    @ManyToOne
    @jakarta.persistence.JoinColumn(name = "tailor_id")
    private User tailor;

    private String title;
    private String category;
    private String ageDemographics;
    private String gender;
    private String outfitType;
    private Double basePrice; // Changed from String to Double for numeric consistency
    private String sampleImage;

    @OneToMany(mappedBy = "design", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<DesignColorVariant> colorVariants;

    @OneToMany(mappedBy = "design", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<DesignPersonalizeDetail> personalizeDetails;

    @jakarta.persistence.Transient
    private String tailorName;

    @jakarta.persistence.Transient
    private String shopName;

    @jakarta.persistence.Transient
    private String location;
}