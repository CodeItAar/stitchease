package com.example.StitchEase.repository;

import com.example.StitchEase.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Fetch all orders for a specific user
    List<Order> findByUserId(Long userId);

    // Filter all orders across the platform by status (e.g., PLACED, IN_PROGRESS, COMPLETED)
    List<Order> findByStatusIgnoreCase(String status);

    // Filter a specific user's orders by status
    List<Order> findByUserIdAndStatusIgnoreCase(Long userId, String status);

    // Get active (ongoing) orders for a user excluding a specific status (e.g., COMPLETED)
    List<Order> findByUserIdAndStatusNotIgnoreCase(Long userId, String status);

    // Fetch all orders with pagination
    Page<Order> findAll(Pageable pageable);

    // Fetch user orders with pagination
    Page<Order> findByUserId(Long userId, Pageable pageable);
}