package com.ali.ecommerce_exam_backend.controller;

import com.ali.ecommerce_exam_backend.exception.CategoryException;
import com.ali.ecommerce_exam_backend.exception.ProductException;
import com.ali.ecommerce_exam_backend.model.Product;
import com.ali.ecommerce_exam_backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

        //     delegating the functionality to the corresponding Service method...
        var products = productService.getAllProductsByOrder(categoryName);

        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) /*throws ProductException*/ {
        var product = productService.getProductById(id);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }


    //    @Secured("ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add-products")
    public ResponseEntity<String> addProducts(@RequestBody List<Product> products) {
        productService.addProducts(products);

        return new ResponseEntity<>("Products added successfully" , HttpStatus.CREATED);
    }

    //    @Secured("ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(
            @PathVariable("id") Long productId,
            @RequestBody Product updatedProduct
    ) throws ProductException {
        productService.updateProduct(productId, updatedProduct);

        return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
    }

    //    @Secured("ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable("id") Long productId
    ) throws ProductException {
        productService.deleteProduct(productId);

        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }

}
