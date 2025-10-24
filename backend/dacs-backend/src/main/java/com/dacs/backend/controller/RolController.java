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

import com.dacs.backend.dto.RolDto;
import com.dacs.backend.service.RolService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RolController {

    private final RolService rolService;

    @PostMapping
    public ResponseEntity<RolDto> create(@RequestBody RolDto dto) {
        return ResponseEntity.ok(rolService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RolDto> update(@PathVariable Long id, @RequestBody RolDto dto) {
        return ResponseEntity.ok(rolService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        rolService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RolDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(rolService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<RolDto>> getAll() {
        return ResponseEntity.ok(rolService.findAll());
    }
}
