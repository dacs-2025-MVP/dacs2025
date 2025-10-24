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

import com.dacs.backend.dto.PresupuestoDto;
import com.dacs.backend.service.PresupuestoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/presupuestos")
@RequiredArgsConstructor
public class PresupuestoController {

    private final PresupuestoService presupuestoService;

    @PostMapping
    public ResponseEntity<PresupuestoDto> create(@RequestBody PresupuestoDto dto) {
        return ResponseEntity.ok(presupuestoService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PresupuestoDto> update(@PathVariable Long id, @RequestBody PresupuestoDto dto) {
        return ResponseEntity.ok(presupuestoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        presupuestoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PresupuestoDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(presupuestoService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<PresupuestoDto>> getAll() {
        return ResponseEntity.ok(presupuestoService.findAll());
    }
}
