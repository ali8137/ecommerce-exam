package com.ali.ecommerce_exam_backend.controller;


import com.ali.ecommerce_exam_backend.exception.CategoryException;
import com.ali.ecommerce_exam_backend.exception.ProductException;
import com.ali.ecommerce_exam_backend.model.Category;
import com.ali.ecommerce_exam_backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;


    @GetMapping("")
    public ResponseEntity<List<Category>> getAllCategoriesByOrder() throws CategoryException {
        var categories = categoryService.getAllCategoriesByOrder();

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }


//    @Secured("ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update-categories-order")
    public ResponseEntity<List<Category>>  updateCategoriesOrder(
            @RequestBody List<Category> categories
    ) throws CategoryException {
        //    delegating the functionality to the corresponding Service method...
        var updatedCategoriesOrder = categoryService.updateCategoriesOrder(categories);

        return new ResponseEntity<>(updatedCategoriesOrder, HttpStatus.CREATED);
    }

    //    @Secured("ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<String>  createNewCategory(
            @RequestBody Category category
    ) {
        categoryService.createNewCategory(category);

        return new ResponseEntity<>("category created successfully", HttpStatus.OK);
    }

    //    @Secured("ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<String>  updateCategory(
            @PathVariable("id") Long categoryId,
            @RequestBody Category updatedCategory
    ) {
        categoryService.updateCategory(categoryId, updatedCategory);

        return new ResponseEntity<>("category updated successfully", HttpStatus.OK);
    }

    //    @Secured("ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(
            @PathVariable("id") Long categoryId
    ) {
        categoryService.deleteProduct(categoryId);

        return new ResponseEntity<>("category deleted successfully", HttpStatus.OK);
    }

}
