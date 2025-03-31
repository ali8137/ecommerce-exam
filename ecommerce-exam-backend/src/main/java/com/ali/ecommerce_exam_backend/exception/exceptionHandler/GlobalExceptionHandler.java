package com.ali.ecommerce_exam_backend.exception.exceptionHandler;

import com.ali.ecommerce_exam_backend.exception.UserException;
import com.ali.ecommerce_exam_backend.exception.errorResponse.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

//@ControllerAdvice
@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(ProductException.class)
//    public ResponseEntity<ProductErrorResponse> handleProductException(ProductException exception) {
//        ProductErrorResponse response = new ProductErrorResponse(
//                exception.getMessage(),
//                LocalDateTime.now(),
//                HttpStatus.NOT_FOUND
//        );
//
//        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//    }

//    @ExceptionHandler(CategoryException.class)
//    public ResponseEntity<ProductErrorResponse> handleCategoryException(CategoryException exception) {
//        ProductErrorResponse response = new ProductErrorResponse(
//                exception.getMessage(),
//                LocalDateTime.now(),
//                HttpStatus.NOT_FOUND
//        );
//
//        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> handleConstraintViolationException(
            ConstraintViolationException exception
    ) {
        Map<String, String> errors = new HashMap<>();

        Set<ConstraintViolation<?>> violations = exception.getConstraintViolations();

        for (ConstraintViolation<?> violation : violations) {
            String property = violation.getPropertyPath().toString();
            String message = violation.getMessage();

            errors.put(property.isEmpty() ? "error" : property, message);
        }

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorResponse> handleUserException(UserException exception) {
        ErrorResponse response = new ErrorResponse(
                exception.getMessage(),
                LocalDateTime.now(),
                HttpStatus.FOUND
        );

        return new ResponseEntity<>(response, HttpStatus.FOUND);
    }

//    @ExceptionHandler(CartException.class)
//    public ResponseEntity<ErrorResponse> handleCartException(CartException exception) {
//        ErrorResponse response = new ErrorResponse(
//                exception.getMessage(),
//                LocalDateTime.now(),
//                HttpStatus.FOUND
//        );
//
//        return new ResponseEntity<>(response, HttpStatus.FOUND);
//    }
//
//
//    @ExceptionHandler(CartItemException.class)
//    public ResponseEntity<ErrorResponse> handleCartItemException(CartItemException exception) {
//        ErrorResponse response = new ErrorResponse(
//                exception.getMessage(),
//                LocalDateTime.now(),
//                HttpStatus.NOT_FOUND
//        );
//
//        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorResponse> handleExpiredJwtException(ExpiredJwtException exception) {
        ErrorResponse response = new ErrorResponse(
                exception.getMessage(),
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST
        );

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}