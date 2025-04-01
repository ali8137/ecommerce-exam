package com.ali.ecommerce_exam_backend.repository;

import com.ali.ecommerce_exam_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryIdOrderByProductListingOrderAsc(Long categoryId);

    List<Product> findByCategoryTitleOrderByProductListingOrderAsc(String categoryName);
}
