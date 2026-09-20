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
    private MeasurementDetails measurement;
    
    private Long designId;
    private String designTitle;
    private String designImageUrl;

    @Data
    public static class MeasurementDetails {
        private Double bustChest;
        private Double waist;
        private Double hips;
        private Double shoulder;
        private Double length;
        private Double sleeveLength;
        private Double neck;
        private Double inseam;
        private String additionalNotes;
    }
}