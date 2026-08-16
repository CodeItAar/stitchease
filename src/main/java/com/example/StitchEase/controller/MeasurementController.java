package com.example.StitchEase.controller;

import com.example.StitchEase.model.Measurement;
import com.example.StitchEase.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/measurements")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class MeasurementController {

    @Autowired
    private MeasurementRepository measurementRepository;

    @PostMapping
    public ResponseEntity<?> saveMeasurement(@RequestBody Measurement measurement) {
        if (measurement.getUser() != null && measurement.getUser().getId() != null) {
            List<Measurement> existing = measurementRepository.findByUserId(measurement.getUser().getId());
            for (Measurement m : existing) {
                if (isDuplicate(m, measurement)) {
                    return ResponseEntity.status(409).body("Measurement already exists");
                }
            }
        }
        Measurement saved = measurementRepository.save(measurement);
        return ResponseEntity.ok(saved);
    }

    private boolean isDuplicate(Measurement m1, Measurement m2) {
        return (m1.getBustChest() != null ? m1.getBustChest().equals(m2.getBustChest()) : m2.getBustChest() == null) &&
               (m1.getWaist() != null ? m1.getWaist().equals(m2.getWaist()) : m2.getWaist() == null) &&
               (m1.getHips() != null ? m1.getHips().equals(m2.getHips()) : m2.getHips() == null) &&
               (m1.getShoulder() != null ? m1.getShoulder().equals(m2.getShoulder()) : m2.getShoulder() == null) &&
               (m1.getLength() != null ? m1.getLength().equals(m2.getLength()) : m2.getLength() == null) &&
               (m1.getSleeveLength() != null ? m1.getSleeveLength().equals(m2.getSleeveLength()) : m2.getSleeveLength() == null) &&
               (m1.getNeck() != null ? m1.getNeck().equals(m2.getNeck()) : m2.getNeck() == null) &&
               (m1.getInseam() != null ? m1.getInseam().equals(m2.getInseam()) : m2.getInseam() == null);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Measurement>> getMeasurementsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(measurementRepository.findByUserId(userId));
    }
}