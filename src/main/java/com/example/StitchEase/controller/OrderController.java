package com.example.StitchEase.controller;

import com.example.StitchEase.dto.OrderRequestDTO;
import com.example.StitchEase.dto.OrderResponseDTO;
import com.example.StitchEase.exception.ResourceNotFoundException;
import com.example.StitchEase.mapper.OrderMapper;
import com.example.StitchEase.model.Measurement;
import com.example.StitchEase.model.Order;
import com.example.StitchEase.model.User;
import com.example.StitchEase.repository.MeasurementRepository;
import com.example.StitchEase.repository.OrderRepository;
import com.example.StitchEase.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Order Controller", description = "APIs for managing tailoring orders, status updates, and user order history")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MeasurementRepository measurementRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Operation(summary = "Create a new order", description = "Validates payload and links persistent user and measurement entities.")
    @PostMapping("/create")
    public ResponseEntity<OrderResponseDTO> createOrder(@Valid @RequestBody OrderRequestDTO requestDTO) {
        User persistentUser = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + requestDTO.getUserId()));

        Measurement persistentMeasurement = measurementRepository.findById(requestDTO.getMeasurementId())
                .orElseThrow(() -> new ResourceNotFoundException("Measurement not found with ID: " + requestDTO.getMeasurementId()));

        Order order = new Order();
        order.setTotalPrice(requestDTO.getTotalPrice());
        order.setStatus(requestDTO.getStatus());
        order.setUser(persistentUser);
        order.setMeasurement(persistentMeasurement);
        
        if (requestDTO.getDeliveryMethod() != null) {
            order.setDeliveryMethod(requestDTO.getDeliveryMethod());
        }
        if (requestDTO.getShippingAddressId() != null) {
            order.setShippingAddressId(requestDTO.getShippingAddressId());
        }

        Order savedOrder = orderRepository.save(order);

        OrderResponseDTO responseDTO = orderMapper.toResponseDTO(savedOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @Operation(summary = "Get all orders (Paginated & Sorted)", description = "Fetches a paginated list of all orders across the platform.")
    @GetMapping("")
    public ResponseEntity<Page<OrderResponseDTO>> getAllOrdersPaginated(
            @ParameterObject Pageable pageable) {

        Page<Order> orderPage = orderRepository.findAll(pageable);
        Page<OrderResponseDTO> dtoPage = orderPage.map(orderMapper::toResponseDTO);

        return ResponseEntity.ok(dtoPage);
    }

    @Operation(summary = "Get all orders for a specific user")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByUser(@PathVariable Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        List<OrderResponseDTO> responseDTOs = orders.stream()
                .map(orderMapper::toResponseDTO)
                .toList();
        return ResponseEntity.ok(responseDTOs);
    }

    @Operation(summary = "Get user orders (Paginated)", description = "Fetches a paginated list of orders for a specific user.")
    @GetMapping("/user/{userId}/paginated")
    public ResponseEntity<Page<OrderResponseDTO>> getUserOrdersPaginated(
            @PathVariable Long userId,
            @ParameterObject Pageable pageable) {

        Page<Order> orderPage = orderRepository.findByUserId(userId, pageable);
        Page<OrderResponseDTO> dtoPage = orderPage.map(orderMapper::toResponseDTO);

        return ResponseEntity.ok(dtoPage);
    }

    @Operation(summary = "Filter all orders globally by status")
    @GetMapping("/status")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByStatus(@RequestParam String status) {
        List<Order> orders = orderRepository.findByStatusIgnoreCase(status);
        List<OrderResponseDTO> responseDTOs = orders.stream()
                .map(orderMapper::toResponseDTO)
                .toList();
        return ResponseEntity.ok(responseDTOs);
    }

    @Operation(summary = "Filter user orders by status")
    @GetMapping("/user/{userId}/status")
    public ResponseEntity<List<OrderResponseDTO>> getUserOrdersByStatus(
            @PathVariable Long userId,
            @RequestParam String status) {
        List<Order> orders = orderRepository.findByUserIdAndStatusIgnoreCase(userId, status);
        List<OrderResponseDTO> responseDTOs = orders.stream()
                .map(orderMapper::toResponseDTO)
                .toList();
        return ResponseEntity.ok(responseDTOs);
    }

    @Operation(summary = "Get active user orders", description = "Retrieves ongoing orders excluding COMPLETED status.")
    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<OrderResponseDTO>> getActiveUserOrders(@PathVariable Long userId) {
        List<Order> orders = orderRepository.findByUserIdAndStatusNotIgnoreCase(userId, "COMPLETED");
        List<OrderResponseDTO> responseDTOs = orders.stream()
                .map(orderMapper::toResponseDTO)
                .toList();
        return ResponseEntity.ok(responseDTOs);
    }

    @Operation(summary = "Update order status")
    @PatchMapping("/{orderId}/status")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        order.setStatus(status);
        orderRepository.save(order);
        return ResponseEntity.ok("Order status updated successfully");
    }
}