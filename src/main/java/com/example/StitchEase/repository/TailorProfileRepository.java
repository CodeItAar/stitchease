package com.example.StitchEase.repository;

import com.example.StitchEase.model.TailorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TailorProfileRepository extends JpaRepository<TailorProfile, Long> {
    Optional<TailorProfile> findByUserId(Long userId);
}
