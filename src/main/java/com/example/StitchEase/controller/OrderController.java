package com.example.StitchEase.controller;

import com.example.StitchEase.model.Measurement;
import com.example.StitchEase.model.Order;
import com.example.StitchEase.model.User;
import com.example.StitchEase.repository.MeasurementRepository;
import com.example.StitchEase.repository.OrderRepository;
import com.example.StitchEase.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MeasurementRepository measurementRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        if (order.getUser() == null || order.getUser().getId() == null) {
            return ResponseEntity.badRequest().body("User ID is required.");
        }
        if (order.getMeasurement() == null || order.getMeasurement().getId() == null) {
            return ResponseEntity.badRequest().body("Measurement ID is required.");
        }

        User persistentUser = userRepository.findById(order.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + order.getUser().getId()));

        Measurement persistentMeasurement = measurementRepository.findById(order.getMeasurement().getId())
                .orElseThrow(() -> new RuntimeException("Measurement not found with ID: " + order.getMeasurement().getId()));

        order.setUser(persistentUser);
        order.setMeasurement(persistentMeasurement);

        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderRepository.findByUserId(userId));
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        return orderRepository.findById(orderId).map(order -> {
            order.setStatus(status);
            orderRepository.save(order);
            return ResponseEntity.ok("Order status updated successfully");
        }).orElse(ResponseEntity.notFound().build());
    }
}