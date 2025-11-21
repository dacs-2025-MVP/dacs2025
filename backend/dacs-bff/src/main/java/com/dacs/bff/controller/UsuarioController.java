package com.dacs.bff.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dacs.bff.dto.UsuarioDto;
import com.dacs.bff.service.ApiBackendService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping({ "/usuarios", "/clientes" })
@RequiredArgsConstructor
public class UsuarioController {

    @Autowired
    private ApiBackendService apiBackendService;

    @GetMapping
    public ResponseEntity<List<UsuarioDto>> getAll() {
        return ResponseEntity.ok(apiBackendService.getUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> getById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(apiBackendService.getUsuarioById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws Exception {
        apiBackendService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<UsuarioDto> create(@org.springframework.web.bind.annotation.RequestBody UsuarioDto dto)
            throws Exception {
        UsuarioDto created = apiBackendService.createUsuario(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDto> update(@PathVariable Long id,
            @org.springframework.web.bind.annotation.RequestBody UsuarioDto dto) throws Exception {
        UsuarioDto updated = apiBackendService.updateUsuario(id, dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/verify/{dni}")
    public ResponseEntity<java.util.Map<String, Object>> verifyDni(@PathVariable("dni") String dni) throws Exception {
        return ResponseEntity.ok(apiBackendService.verifyDni(dni));
    }
}
