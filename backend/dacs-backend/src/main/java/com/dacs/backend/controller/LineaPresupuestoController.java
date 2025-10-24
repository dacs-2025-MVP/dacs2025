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

import com.dacs.backend.dto.LineaPresupuestoDto;
import com.dacs.backend.service.LineaPresupuestoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/lineas-presupuesto")
@RequiredArgsConstructor
public class LineaPresupuestoController {

    private final LineaPresupuestoService lineaService;

    @PostMapping
    public ResponseEntity<LineaPresupuestoDto> create(@RequestBody LineaPresupuestoDto dto) {
        return ResponseEntity.ok(lineaService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LineaPresupuestoDto> update(@PathVariable Long id, @RequestBody LineaPresupuestoDto dto) {
        return ResponseEntity.ok(lineaService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        lineaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LineaPresupuestoDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(lineaService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<LineaPresupuestoDto>> getAll() {
        return ResponseEntity.ok(lineaService.findAll());
    }
}
