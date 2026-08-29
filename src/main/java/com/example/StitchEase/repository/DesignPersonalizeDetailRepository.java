package com.example.StitchEase.repository;

import com.example.StitchEase.model.DesignPersonalizeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DesignPersonalizeDetailRepository extends JpaRepository<DesignPersonalizeDetail, Long> {
    List<DesignPersonalizeDetail> findByDesignId(Long designId);
}
