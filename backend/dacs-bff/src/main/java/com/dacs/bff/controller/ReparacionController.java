package com.dacs.bff.controller;

import com.dacs.bff.service.ApiBackendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping({ "/reparaciones" })
@RequiredArgsConstructor
public class ReparacionController {

    private final ApiBackendService apiBackendClient;

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getReparacionById(@PathVariable Long id) {
        return ResponseEntity.ok(apiBackendClient.getReparacionById(id));
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<Map<String, Object>> getReparacionDetails(@PathVariable Long id) {
        return ResponseEntity.ok(apiBackendClient.getReparacionDetails(id));
    }

    @org.springframework.web.bind.annotation.PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateReparacion(@PathVariable Long id, @org.springframework.web.bind.annotation.RequestBody Map<String, Object> dto) {
        return ResponseEntity.ok(apiBackendClient.updateReparacion(id, dto));
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReparacion(@PathVariable Long id) {
        apiBackendClient.deleteReparacion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/lineas")
    public ResponseEntity<java.util.List<Map<String, Object>>> getLineas(@PathVariable Long id) {
        return ResponseEntity.ok(apiBackendClient.getLineasReparacion(id));
    }

    @org.springframework.web.bind.annotation.PostMapping("/{id}/lineas")
    public ResponseEntity<Map<String, Object>> addLinea(@PathVariable Long id, @org.springframework.web.bind.annotation.RequestBody Map<String, Object> dto) {
        return ResponseEntity.ok(apiBackendClient.addLineaReparacion(id, dto));
    }
}
