package com.example.StitchEase.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class OrderRequestDTO {

    @NotNull(message = "Total price is required")
    @Positive(message = "Total price must be greater than zero")
    private Double totalPrice;

    @NotBlank(message = "Status cannot be empty")
    private String status;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Measurement ID is required")
    private Long measurementId;

    private String deliveryMethod;
    
    private Long shippingAddressId;

    private Long designId;
}