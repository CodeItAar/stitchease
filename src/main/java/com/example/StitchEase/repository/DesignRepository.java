package com.example.StitchEase.repository;

import com.example.StitchEase.model.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignRepository extends JpaRepository<Design, Long> {

    @Query("SELECT d FROM Design d WHERE " +
            "(:age IS NULL OR LOWER(d.ageDemographics) LIKE LOWER(CONCAT('%', :age, '%'))) AND " +
            "(:gender IS NULL OR " +
            "    (LOWER(:gender) = 'women' AND (LOWER(d.gender) LIKE '%women%' OR LOWER(d.gender) LIKE '%female%')) OR " +
            "    (LOWER(:gender) = 'men' AND (LOWER(d.gender) LIKE '%men%' OR LOWER(d.gender) LIKE '%male%')) OR " +
            "    (LOWER(:gender) NOT IN ('women', 'men') AND LOWER(d.gender) LIKE LOWER(CONCAT('%', :gender, '%'))) " +
            ") AND " +
            "(:category IS NULL OR LOWER(d.category) LIKE LOWER(CONCAT('%', :category, '%'))) AND " +
            "(:outfit IS NULL OR LOWER(d.outfitType) LIKE LOWER(CONCAT('%', :outfit, '%')))")
    List<Design> filterDesigns(
            @Param("age") String age,
            @Param("gender") String gender,
            @Param("category") String category,
            @Param("outfit") String outfit
    );
}