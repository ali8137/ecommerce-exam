package com.ali.ecommerce_exam_backend.repository;

import com.ali.ecommerce_exam_backend.model.Cart;
import com.ali.ecommerce_exam_backend.model.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    //    methods with functionalities based on its name structure:

    //    JPQL queries:

    //    native SQL queries: methods with functionalities based on the SQL query specified in the annotation:

}
