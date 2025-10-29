package com.dacs.bff.exeption;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import feign.FeignException;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(GenericException.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(GenericException ex) {
        log.error("Handled GenericException: {}", ex.getError(), ex);
        IEnumError error = ex.getError();
        Map<String, Object> body = new HashMap<>();
        body.put("code", error.code());
        body.put("message", error.message());
        body.put("params", ex.getParams());
        body.put("timestamp", Instant.now().toString());
        return ResponseEntity.status(error.status()).body(body);
    }

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<Map<String, Object>> handleFeign(FeignException ex) {
        log.error("Feign exception calling upstream service", ex);
        Map<String, Object> body = new HashMap<>();
        body.put("code", ErrorEnum.ERROR_API.code());
        body.put("message", "Upstream service error: " + ex.getMessage());
        body.put("timestamp", Instant.now().toString());
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(Exception ex) {
        log.error("Unexpected exception", ex);
        Map<String, Object> body = new HashMap<>();
        body.put("code", ErrorEnum.ERROR_INESPERADO.code());
        body.put("message", ErrorEnum.ERROR_INESPERADO.message());
        body.put("timestamp", Instant.now().toString());
        return ResponseEntity.status(ErrorEnum.ERROR_INESPERADO.status()).body(body);
    }

}
