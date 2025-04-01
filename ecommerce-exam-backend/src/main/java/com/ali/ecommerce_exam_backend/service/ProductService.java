package com.ali.ecommerce_exam_backend.service;

import com.ali.ecommerce_exam_backend.exception.CategoryException;
import com.ali.ecommerce_exam_backend.exception.ProductException;
import com.ali.ecommerce_exam_backend.model.Category;
import com.ali.ecommerce_exam_backend.model.Product;
import com.ali.ecommerce_exam_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    // get all products by ascending order of productListingOrder
    public List<Product> getAllProductsByOrder(String categoryName) {
        var categories = productRepository.findByCategoryTitleOrderByProductListingOrderAsc(categoryName);

        if (categories.isEmpty()) {
            throw new CategoryException("No products found.");
        }

        return categories;
    }

    public Product getProductById(Long productId) {

        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Product not found"));
    }


    public void addProducts(List<Product> products) {
        productRepository.saveAll(products);
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public void updateProduct(Long productId, Product updatedProduct) {
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isEmpty()) {
            throw new ProductException("Product not found");
        }

        Product product = productOptional.get();


        Integer maxProductListingOrderByCategory = productRepository.
                findMaxProductListingOrderByCategoryTitle(product.getCategory().getTitle());

        product.setTitle(updatedProduct.getTitle());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setProductListingOrder(maxProductListingOrderByCategory + 1);

        product.setCategory(updatedProduct.getCategory()); // foreign key

        productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }
}
