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
        }

        return dto;
    }
}