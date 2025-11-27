package com.dacs.bff.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dacs.bff.api.client.ApiBackendClient;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({ "/vehiculos" })
@RequiredArgsConstructor
public class VehiculoController {

    @Autowired
    private ApiBackendClient apiBackendClient;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        return ResponseEntity.ok(apiBackendClient.vehiculos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(apiBackendClient.vehiculoById(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Map<String, Object> dto) throws Exception {
        return ResponseEntity.ok(apiBackendClient.saveVehiculo(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Map<String, Object> dto)
            throws Exception {
        return ResponseEntity.ok(apiBackendClient.updateVehiculo(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws Exception {
        apiBackendClient.deleteVehiculo(id);
        return ResponseEntity.noContent().build();
    }
}
