package com.ali.ecommerce_exam_backend.controller;


import com.ali.ecommerce_exam_backend.exception.CategoryException;
import com.ali.ecommerce_exam_backend.model.Category;
import com.ali.ecommerce_exam_backend.service.CategoryService;
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

}
