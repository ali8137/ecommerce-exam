package com.ali.ecommerce_exam_backend.service;

import com.ali.ecommerce_exam_backend.exception.CategoryException;
import com.ali.ecommerce_exam_backend.model.Category;
import com.ali.ecommerce_exam_backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public List<Category> updateCategoriesOrder(List<Category> updatedCategories) {
        List<Category> categories = categoryRepository.findAll();

        if (categories.isEmpty()) {
            throw new CategoryException("No categories found.");
        }

        log.info("updatedCategories: {}", updatedCategories);

        // reset categoryListingOrder to null to avoid the unique constraint
        for (Category category : categories) {
            category.setCategoryListingOrder(null);
        }
        categoryRepository.saveAll(categories);  // save the reset state in the database

        // convert updatedCategories to a map for fast lookup
        Map<Long, Integer> updatedCategoriesrMap = updatedCategories.stream()
                .collect(Collectors.toMap(Category::getId, Category::getCategoryListingOrder));

        // Update ordering in currentCategories based on updatedCategories
        List<Category> updatedCurrentCategories = categories.stream()
                .map(category -> Category.builder()
                        .id(category.getId())
                        .title(category.getTitle())
                        .description(category.getDescription())
                        .products(category.getProducts())
                        .categoryListingOrder(updatedCategoriesrMap.getOrDefault(category.getId(), category.getCategoryListingOrder()))
                        .build()
                )
                .toList();

        return categoryRepository.saveAll(updatedCurrentCategories);
    }
}
