package com.example.StitchEase.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrderResponseDTO {
    private Long id;
    private Double totalPrice;
    private String status;
    private LocalDateTime createdAt;
    private Long userId;
    private String userName;
    private Long measurementId;
    private Long designId;
    private String designTitle;
}