package com.example.StitchEase.repository;

import com.example.StitchEase.model.DesignColorVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesignColorVariantRepository extends JpaRepository<DesignColorVariant, Long> {
}
