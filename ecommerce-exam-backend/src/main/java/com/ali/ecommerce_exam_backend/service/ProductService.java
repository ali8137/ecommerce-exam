package com.ali.ecommerce_exam_backend.service;

import com.ali.ecommerce_exam_backend.exception.CategoryException;
import com.ali.ecommerce_exam_backend.model.Category;
import com.ali.ecommerce_exam_backend.model.Product;
import com.ali.ecommerce_exam_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

//    public List<Product> getAllProductsByOrder(Long categoryId) {
//        var categories = productRepository.findByCategoryIdOrderByProductListingOrderAsc(categoryId);
//
//        if (categories.isEmpty()) {
//            throw new CategoryException("No products found.");
//        }
//
//        return categories;
//    }

    public List<Product> getAllProductsByOrder(String categoryName) {
        var categories = productRepository.findByCategoryTitleOrderByProductListingOrderAsc(categoryName);

        if (categories.isEmpty()) {
            throw new CategoryException("No products found.");
        }

        return categories;
    }

}
