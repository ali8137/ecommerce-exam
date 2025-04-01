package com.ali.ecommerce_exam_backend.controller;

import com.ali.ecommerce_exam_backend.exception.CartException;
import com.ali.ecommerce_exam_backend.model.Cart;
import com.ali.ecommerce_exam_backend.model.CartItem;
import com.ali.ecommerce_exam_backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/get-carts")
    public ResponseEntity<List<Cart>> getUserCarts(
            @AuthenticationPrincipal UserDetails userDetails
    ) throws CartException {

        //    delegating the functionality to the corresponding Service method...
        var userCarts = cartService.getUserCarts(userDetails);

        return new ResponseEntity<>(userCarts, HttpStatus.OK);
    }

    // for current project design, only one cart is there in the carts array for a user
    @PostMapping("/add-cart-item")
    public ResponseEntity<List<Cart>>  addCartItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CartItem cartItem
    ) throws CartException {
        //    delegating the functionality to the corresponding Service method...
        cartService.addCartItem(userDetails, cartItem);

        // TODO: it would be better to return a DTO of the cart instead
        var userCarts = cartService.getUserCarts(userDetails);

        return new ResponseEntity<>(userCarts, HttpStatus.CREATED);
    }
}
