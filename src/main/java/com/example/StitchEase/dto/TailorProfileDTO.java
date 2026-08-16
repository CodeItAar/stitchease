package com.example.StitchEase.dto;

import java.util.List;

public class TailorProfileDTO {
    private String shopName;
    private Integer establishedYear;
    private String location;
    private String description;

    private boolean governmentIdVerified;
    private boolean tradeLicenseVerified;
    private boolean gstinVerified;
    private boolean premiumPartner;

    private String experienceYears;
    private String standardLeadTime;
    private String customLeadTime;
    
    private List<String> coreSpecializations;
    
    private String bankAccount;
    private String upiId;
    
    // For portfolio highlights (from Designs)
    private List<PortfolioImageDTO> portfolioHighlights;

    // Default constructor
    public TailorProfileDTO() {}

    // Getters and Setters
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

    public List<String> getCoreSpecializations() { return coreSpecializations; }
    public void setCoreSpecializations(List<String> coreSpecializations) { this.coreSpecializations = coreSpecializations; }

    public String getBankAccount() { return bankAccount; }
    public void setBankAccount(String bankAccount) { this.bankAccount = bankAccount; }

    public String getUpiId() { return upiId; }
    public void setUpiId(String upiId) { this.upiId = upiId; }

    public List<PortfolioImageDTO> getPortfolioHighlights() { return portfolioHighlights; }
    public void setPortfolioHighlights(List<PortfolioImageDTO> portfolioHighlights) { this.portfolioHighlights = portfolioHighlights; }

    public static class PortfolioImageDTO {
        private Long id;
        private String imageUrl;
        private String title;

        public PortfolioImageDTO() {}

        public PortfolioImageDTO(Long id, String imageUrl, String title) {
            this.id = id;
            this.imageUrl = imageUrl;
            this.title = title;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
    }
}
