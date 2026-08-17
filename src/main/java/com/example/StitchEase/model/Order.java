package com.example.StitchEase.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "design_id")
    private Design design;

    @ManyToOne
    @JoinColumn(name = "custom_request_id")
    private CustomRequest customRequest;

    @ManyToOne
    @JoinColumn(name = "measurement_id", nullable = false)
    private Measurement measurement;

    @Column(nullable = false)
    private Double totalPrice;

    private String status = "PLACED";

    private String deliveryMethod; // "HOME_DELIVERY" or "STORE_PICKUP"
    private Long shippingAddressId;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Order() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Design getDesign() { return design; }
    public void setDesign(Design design) { this.design = design; }

    public CustomRequest getCustomRequest() { return customRequest; }
    public void setCustomRequest(CustomRequest customRequest) { this.customRequest = customRequest; }

    public Measurement getMeasurement() { return measurement; }
    public void setMeasurement(Measurement measurement) { this.measurement = measurement; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getDeliveryMethod() { return deliveryMethod; }
    public void setDeliveryMethod(String deliveryMethod) { this.deliveryMethod = deliveryMethod; }

    public Long getShippingAddressId() { return shippingAddressId; }
    public void setShippingAddressId(Long shippingAddressId) { this.shippingAddressId = shippingAddressId; }
}