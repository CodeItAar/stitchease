package com.example.StitchEase.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tailor_profiles")
public class TailorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    private String shopName;
    private Integer establishedYear;
    private String location;
    
    @Column(columnDefinition = "TEXT")
    private String description;

    private boolean governmentIdVerified;
    private boolean tradeLicenseVerified;
    private boolean gstinVerified;
    private boolean premiumPartner;

    private String experienceYears;
    private String standardLeadTime;
    private String customLeadTime;
    
    private String coreSpecializations; // Comma-separated string for simplicity
    
    private String bankAccount;
    private String upiId;

    public TailorProfile() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public Integer getEstablishedYear() { return establishedYear; }
    public void setEstablishedYear(Integer establishedYear) { this.establishedYear = establishedYear; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isGovernmentIdVerified() { return governmentIdVerified; }
    public void setGovernmentIdVerified(boolean governmentIdVerified) { this.governmentIdVerified = governmentIdVerified; }

    public boolean isTradeLicenseVerified() { return tradeLicenseVerified; }
    public void setTradeLicenseVerified(boolean tradeLicenseVerified) { this.tradeLicenseVerified = tradeLicenseVerified; }

    public boolean isGstinVerified() { return gstinVerified; }
    public void setGstinVerified(boolean gstinVerified) { this.gstinVerified = gstinVerified; }

    public boolean isPremiumPartner() { return premiumPartner; }
    public void setPremiumPartner(boolean premiumPartner) { this.premiumPartner = premiumPartner; }

    public String getExperienceYears() { return experienceYears; }
    public void setExperienceYears(String experienceYears) { this.experienceYears = experienceYears; }

    public String getStandardLeadTime() { return standardLeadTime; }
    public void setStandardLeadTime(String standardLeadTime) { this.standardLeadTime = standardLeadTime; }

    public String getCustomLeadTime() { return customLeadTime; }
    public void setCustomLeadTime(String customLeadTime) { this.customLeadTime = customLeadTime; }

    public String getCoreSpecializations() { return coreSpecializations; }
    public void setCoreSpecializations(String coreSpecializations) { this.coreSpecializations = coreSpecializations; }

    public String getBankAccount() { return bankAccount; }
    public void setBankAccount(String bankAccount) { this.bankAccount = bankAccount; }

    public String getUpiId() { return upiId; }
    public void setUpiId(String upiId) { this.upiId = upiId; }
}
