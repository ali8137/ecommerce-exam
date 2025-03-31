package com.ali.ecommerce_exam_backend.exception.errorResponse;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;


@Getter
@Setter
public class ErrorResponse {

    private final String message;
    private final LocalDateTime timestamp;
    private final HttpStatus httpStatus;

    public ErrorResponse(String message, LocalDateTime now, HttpStatus httpStatus) {
        this.message = message;
        this.timestamp = now;
        this.httpStatus = httpStatus;
    }
}
