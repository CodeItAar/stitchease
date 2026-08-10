package com.example.StitchEase.repository;

import com.example.StitchEase.model.CustomRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomRequestRepository extends JpaRepository<CustomRequest, Long> {
    List<CustomRequest> findByUserId(Long userId);
}