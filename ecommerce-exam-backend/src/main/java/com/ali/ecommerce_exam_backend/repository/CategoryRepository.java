package com.ali.ecommerce_exam_backend.repository;


import com.ali.ecommerce_exam_backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByOrderByCategoryListingOrderAsc();
}
