package com.ali.ecommerce_exam_backend.service;

import com.ali.ecommerce_exam_backend.exception.CartException;
import com.ali.ecommerce_exam_backend.exception.ProductException;
import com.ali.ecommerce_exam_backend.exception.UserException;
import com.ali.ecommerce_exam_backend.model.Cart;
import com.ali.ecommerce_exam_backend.model.CartItem;
import com.ali.ecommerce_exam_backend.model.User;
import com.ali.ecommerce_exam_backend.repository.CartRepository;
import com.ali.ecommerce_exam_backend.repository.ProductRepository;
import com.ali.ecommerce_exam_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    /* TODO: injecting the associated services of the below repositories would have been better for
            modularity, scalability and testing. add the service classes rather than the repositories below*/
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<Cart> getUserCarts(UserDetails userDetails) {
        // extract email from user details:
        String email = userDetails.getUsername();

        // get the user's cart(s) from the database:
        var userCarts = getCarts(email);

        if (userCarts.isEmpty()) {
            throw new CartException("No cart found");
        }

        // return the user's cart(s):
        return userCarts;
    }

    /* TODO: developer-constraint: you can't be used unless the method createCart() is called just before it*/
    // the below method will create a new cart item and add it to the cart:
    public void addCartItem(UserDetails userDetails, CartItem cartItem) {
        /* TODO: the parameter above is better be rather made to include the product
            id, price */

        // extract email from user details:
        String email = userDetails.getUsername();

        // get the user's cart(s) from the database:
        List<Cart> carts = this.getCarts(email);

        // if no cart exists, create a new one and add to it to the cart list:
        if (carts.isEmpty()) {
            Cart cart = this.createCart(email);
            carts.add(cart);
        } else {
            // get the first cart from the cart list:
            Cart firstCart = carts.get(0);

            // check if the new cartItem has the same productId as any of the existing cartItems:
            for (CartItem existingCartItem : firstCart.getCartItems()) {
                if (existingCartItem.getProduct().getId().equals(cartItem.getProduct().getId())) {
                    // increment the quantity of the existing cartItem:
                    existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);

                    // update the total price of the cart:
                    firstCart.setTotalPrice(firstCart.getTotalPrice().add(existingCartItem.getProduct().getPrice()));

                    // save the cart to the database:
                    cartRepository.save(firstCart);
                    return;
                }
            }

        }

        // associate the cart item with the cart:
        Cart firstCart = carts.get(0);
        cartItem.setCart(firstCart);

        // associate the cart item with the product:
        var product = productRepository.findById(cartItem.getProduct().getId())
                .orElseThrow(() -> new ProductException("Product not found"));
        cartItem.setProduct(product);

        // add the cart item to the cart for java object graph:
        List<CartItem> cartItems = firstCart.getCartItems();
        cartItems.add(cartItem);
        firstCart.setCartItems(cartItems);

        // set the quantity of the cart item to 1:
        cartItem.setQuantity(1);

        // update the total price of the cart:
        firstCart.setTotalPrice(
                firstCart.getTotalPrice().add(product.getPrice())
        );

        // save the cart to the database:
        cartRepository.save(firstCart);
    }




    //    helper private methods:

    private List<Cart> getCarts(String email) {
        return cartRepository.findAllByUserEmail(email);
        /* TODO: it is better to also handle the exception that might be thrown when the user is not found*/
    }

    private Cart createCart(String email) {
        // create a new cart and associate it with the user:
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserException("User not found"));
        Cart cart = new Cart();
        cart.setUser(user);

        return cart;
    }

}
