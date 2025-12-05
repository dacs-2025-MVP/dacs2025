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

import com.dacs.backend.dto.ReparacionDto;
import com.dacs.backend.service.ReparacionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reparaciones")
@RequiredArgsConstructor
public class ReparacionController {

    private final ReparacionService reparacionService;
    private final com.dacs.backend.service.LineaReparacionService lineaService;

    @PostMapping
    public ResponseEntity<ReparacionDto> create(@RequestBody ReparacionDto dto) {
        return ResponseEntity.ok(reparacionService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReparacionDto> update(@PathVariable Long id, @RequestBody ReparacionDto dto) {
        return ResponseEntity.ok(reparacionService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reparacionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReparacionDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(reparacionService.getReparacionDetails(id));
    }

    @GetMapping("/{id}/lineas")
    public ResponseEntity<java.util.List<com.dacs.backend.dto.LineaReparacionDto>> getLineas(@PathVariable Long id) {
        return ResponseEntity.ok(lineaService.findByReparacionId(id));
    }

    @PostMapping("/{id}/lineas")
    public ResponseEntity<com.dacs.backend.dto.LineaReparacionDto> createLinea(@PathVariable Long id, @RequestBody com.dacs.backend.dto.LineaReparacionDto dto) {
        dto.setReparacionId(id);
        return ResponseEntity.ok(lineaService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ReparacionDto>> getAll() {
        return ResponseEntity.ok(reparacionService.findAll());
    }
}
