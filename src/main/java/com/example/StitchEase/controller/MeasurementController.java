package com.example.StitchEase.controller;

import com.example.StitchEase.model.Measurement;
import com.example.StitchEase.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/measurements")
@CrossOrigin(origins = "*")
public class MeasurementController {

    @Autowired
    private MeasurementRepository measurementRepository;

    @PostMapping
    public ResponseEntity<Measurement> saveMeasurement(@RequestBody Measurement measurement) {
        Measurement saved = measurementRepository.save(measurement);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Measurement>> getMeasurementsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(measurementRepository.findByUserId(userId));
    }
}