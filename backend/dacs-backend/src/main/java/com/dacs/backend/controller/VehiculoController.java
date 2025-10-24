package com.dacs.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dacs.backend.dto.VehiculoDto;
import com.dacs.backend.service.VehiculoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/vehiculos")
@RequiredArgsConstructor
public class VehiculoController {

    private final VehiculoService vehiculoService;

    @PostMapping
    public ResponseEntity<VehiculoDto> create(@RequestBody VehiculoDto dto) {
        return ResponseEntity.ok(vehiculoService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehiculoDto> update(@PathVariable Long id, @RequestBody VehiculoDto dto) {
        return ResponseEntity.ok(vehiculoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        vehiculoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehiculoDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculoService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<VehiculoDto>> getAll() {
        return ResponseEntity.ok(vehiculoService.findAll());
    }
}
