package com.example.StitchEase.model;

import jakarta.persistence.*;

@Entity
@Table(name = "measurements")
public class Measurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double bustChest;
    private Double waist;
    private Double hips;
    private Double shoulder;
    private Double length;

    @Column(columnDefinition = "TEXT")
    private String additionalNotes;

    public Measurement() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Double getBustChest() { return bustChest; }
    public void setBustChest(Double bustChest) { this.bustChest = bustChest; }

    public Double getWaist() { return waist; }
    public void setWaist(Double waist) { this.waist = waist; }

    public Double getHips() { return hips; }
    public void setHips(Double hips) { this.hips = hips; }

    public Double getShoulder() { return shoulder; }
    public void setShoulder(Double shoulder) { this.shoulder = shoulder; }

    public Double getLength() { return length; }
    public void setLength(Double length) { this.length = length; }

    public String getAdditionalNotes() { return additionalNotes; }
    public void setAdditionalNotes(String additionalNotes) { this.additionalNotes = additionalNotes; }
}
