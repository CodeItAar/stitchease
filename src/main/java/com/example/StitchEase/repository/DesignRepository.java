package com.example.StitchEase.repository;

import com.example.StitchEase.model.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignRepository extends JpaRepository<Design, String> {

    @Query("SELECT d FROM Design d WHERE " +
            "(:age IS NULL OR d.ageDemographics = :age) AND " +
            "(:gender IS NULL OR d.gender = :gender) AND " +
            "(:category IS NULL OR d.category = :category) AND " +
            "(:outfit IS NULL OR d.outfitType = :outfit)")
    List<Design> filterDesigns(
            @Param("age") String age,
            @Param("gender") String gender,
            @Param("category") String category,
            @Param("outfit") String outfit
    );
}