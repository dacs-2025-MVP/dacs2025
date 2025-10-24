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

import com.dacs.backend.dto.FotoDto;
import com.dacs.backend.service.FotoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/fotos")
@RequiredArgsConstructor
public class FotoController {

    private final FotoService fotoService;

    @PostMapping
    public ResponseEntity<FotoDto> create(@RequestBody FotoDto dto) {
        return ResponseEntity.ok(fotoService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FotoDto> update(@PathVariable Long id, @RequestBody FotoDto dto) {
        return ResponseEntity.ok(fotoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        fotoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FotoDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(fotoService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<FotoDto>> getAll() {
        return ResponseEntity.ok(fotoService.findAll());
    }
}
