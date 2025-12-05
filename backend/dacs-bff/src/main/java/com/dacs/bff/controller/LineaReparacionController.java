package com.dacs.bff.controller;

import com.dacs.bff.service.ApiBackendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/lineas-reparacion")
@RequiredArgsConstructor
public class LineaReparacionController {

    private final ApiBackendService apiBackendClient;

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Map<String, Object> dto) {
        return ResponseEntity.ok(apiBackendClient.updateLineaReparacion(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        apiBackendClient.deleteLineaReparacion(id);
        return ResponseEntity.noContent().build();
    }
}
