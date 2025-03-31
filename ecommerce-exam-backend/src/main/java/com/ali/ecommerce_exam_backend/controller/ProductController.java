package com.ali.ecommerce_exam_backend.controller;

import com.ali.ecommerce_exam_backend.exception.CategoryException;
import com.ali.ecommerce_exam_backend.exception.ProductException;
import com.ali.ecommerce_exam_backend.model.Product;
import com.ali.ecommerce_exam_backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

//    @GetMapping("")
//    public ResponseEntity<List<Product>> getAllProductsByOrder(
//            @RequestParam Long categoryId
//    ) throws ProductException {
//        var products = productService.getAllProductsByOrder(categoryId);
//
//        return new ResponseEntity<>(products, HttpStatus.OK);
//    }


    // TODO: responding with a list of productDTOs would have been better
    @GetMapping("")
    public ResponseEntity<List<Product>> getAllProductsByOrder(
            @RequestParam String categoryName
    ) throws ProductException {
        var products = productService.getAllProductsByOrder(categoryName);

        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
