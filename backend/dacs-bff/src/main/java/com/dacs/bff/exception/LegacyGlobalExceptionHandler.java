package com.dacs.bff.exception;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class LegacyGlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(LegacyGlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAll(Exception ex) {
        logger.error("Unhandled exception in BFF (legacy handler)", ex);
        Map<String, Object> body = new HashMap<>();
        body.put("error", true);
        body.put("errorCode", "SERVER_ERROR");
        String msg = ex.getMessage() != null ? ex.getMessage() : "Error del servidor. Intente más tarde.";
        body.put("errorDescription", "Error del servidor. Intente más tarde.");
        body.put("details", msg);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
