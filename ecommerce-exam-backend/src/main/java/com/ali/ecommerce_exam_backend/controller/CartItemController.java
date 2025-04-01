package com.ali.ecommerce_exam_backend.controller;

import com.ali.ecommerce_exam_backend.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart-item")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;


    // increase the quantity of the cart item by 1, this method uses cartItemId to specify the cart item
    @PutMapping("/increment-cart-item/{id}")
    public ResponseEntity<String> incrementItem(
            @PathVariable("id") Long cartItemId
    ) /*throws CartItemException*/ {

        //    delegating the functionality to the corresponding Service method...
        cartItemService.incrementCartItem(cartItemId);

        return new ResponseEntity<>(
                "cart item updated successfully",
                HttpStatus.CREATED
        );
    }

}
