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

import com.dacs.backend.dto.UsuarioDto;
import com.dacs.backend.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioDto> create(@RequestBody UsuarioDto dto) {
        return ResponseEntity.ok(usuarioService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDto> update(@PathVariable Long id, @RequestBody UsuarioDto dto) {
        return ResponseEntity.ok(usuarioService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDto>> getAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    // List application users (usuarios that have credentials)
    @GetMapping("/app-users")
    public ResponseEntity<List<UsuarioDto>> getAppUsers() {
        return ResponseEntity.ok(usuarioService.findUsers());
    }

    // List clients available to be associated with an app user (no username yet)
    @GetMapping("/available-for-user")
    public ResponseEntity<List<UsuarioDto>> getAvailableForUser() {
        return ResponseEntity.ok(usuarioService.findAvailableClientsForUser());
    }

    // Create an app-user for an existing client. Body: { "clienteId": 123 }
    @PostMapping("/create-user")
    public ResponseEntity<UsuarioDto> createUserForCliente(@RequestBody java.util.Map<String, Object> body) {
        Object o = body.get("clienteId");
        if (o == null) return ResponseEntity.badRequest().build();
        Long clienteId = Long.valueOf(String.valueOf(o));
        return ResponseEntity.ok(usuarioService.createUserForCliente(clienteId));
    }
}
