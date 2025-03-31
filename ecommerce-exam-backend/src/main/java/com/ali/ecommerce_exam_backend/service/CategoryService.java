package com.ali.ecommerce_exam_backend.service;

import com.ali.ecommerce_exam_backend.exception.CategoryException;
import com.ali.ecommerce_exam_backend.model.Category;
import com.ali.ecommerce_exam_backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategoriesByOrder() {
        var categories = categoryRepository.findAllByOrderByCategoryListingOrderAsc();

        if (categories.isEmpty()) {
            throw new CategoryException("No categories found.");
        }

        return categories;
    }
}
