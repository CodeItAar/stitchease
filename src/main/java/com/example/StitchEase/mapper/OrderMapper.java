package com.example.StitchEase.mapper;

import com.example.StitchEase.dto.OrderResponseDTO;
import com.example.StitchEase.model.Order;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderResponseDTO toResponseDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setId(order.getId());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());

        if (order.getUser() != null) {
            dto.setUserId(order.getUser().getId());
            dto.setUserName(order.getUser().getName());
        }

        if (order.getMeasurement() != null) {
            dto.setMeasurementId(order.getMeasurement().getId());
            
            OrderResponseDTO.MeasurementDetails md = new OrderResponseDTO.MeasurementDetails();
            md.setBustChest(order.getMeasurement().getBustChest());
            md.setWaist(order.getMeasurement().getWaist());
            md.setHips(order.getMeasurement().getHips());
            md.setShoulder(order.getMeasurement().getShoulder());
            md.setLength(order.getMeasurement().getLength());
            md.setSleeveLength(order.getMeasurement().getSleeveLength());
            md.setNeck(order.getMeasurement().getNeck());
            md.setInseam(order.getMeasurement().getInseam());
            md.setAdditionalNotes(order.getMeasurement().getAdditionalNotes());
            dto.setMeasurement(md);
        }

        if (order.getDesign() != null) {
            dto.setDesignId(order.getDesign().getId());
            dto.setDesignTitle(order.getDesign().getTitle());
            dto.setDesignImageUrl(order.getDesign().getSampleImage());
        }

        return dto;
    }
}