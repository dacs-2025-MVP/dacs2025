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
        return ResponseEntity.ok(reparacionService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<ReparacionDto>> getAll() {
        return ResponseEntity.ok(reparacionService.findAll());
    }
}
