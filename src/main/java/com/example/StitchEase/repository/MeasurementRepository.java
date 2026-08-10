package com.example.StitchEase.repository;

import com.example.StitchEase.model.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MeasurementRepository extends JpaRepository<Measurement, Long> {
    List<Measurement> findByUserId(Long userId);
}