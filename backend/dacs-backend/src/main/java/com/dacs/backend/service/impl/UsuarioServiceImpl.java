package com.dacs.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dacs.backend.dto.UsuarioDto;
import com.dacs.backend.model.entity.Rol;
import com.dacs.backend.model.entity.Usuario;
import com.dacs.backend.model.repository.RolRepository;
import com.dacs.backend.model.repository.UsuarioRepository;
import com.dacs.backend.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    @Override
    public UsuarioDto create(UsuarioDto dto) {
        Usuario u = toEntity(dto);
        if (dto.getRolId() != null) {
            Rol r = rolRepository.findById(dto.getRolId()).orElse(null);
            u.setRol(r);
        }
        Usuario saved = usuarioRepository.save(u);
        return toDto(saved);
    }

    @Override
    public UsuarioDto update(Long id, UsuarioDto dto) {
        Usuario u = usuarioRepository.findById(id).orElseThrow();
        u.setNombre(dto.getNombre());
        u.setApellido(dto.getApellido());
        u.setNum_telefono(dto.getNum_telefono());
        u.setCorreo(dto.getCorreo());
        u.setDni(dto.getDni());
        if (dto.getRolId() != null) {
            Rol r = rolRepository.findById(dto.getRolId()).orElse(null);
            u.setRol(r);
        }
        return toDto(usuarioRepository.save(u));
    }

    @Override
    public void delete(Long id) {
        try {
            usuarioRepository.deleteById(id);
        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            // translate to a 409 so frontend can show a meaningful message
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.CONFLICT,
                    "No se puede eliminar el usuario porque tiene registros relacionados.",
                    ex);
        }
    }

    @Override
    public UsuarioDto findById(Long id) {
        return usuarioRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<UsuarioDto> findAll() {
        return usuarioRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<UsuarioDto> findUsers() {
        return usuarioRepository.findByUsernameIsNotNull().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<UsuarioDto> findAvailableClientsForUser() {
        return usuarioRepository.findByUsernameIsNull().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public UsuarioDto createUserForCliente(Long clienteId) {
        Usuario u = usuarioRepository.findById(clienteId).orElseThrow();
        if (u.getUsername() != null && !u.getUsername().isEmpty()) {
            return toDto(u); // already has user
        }
        // Build username: nombre + apellido, lowercase, without spaces
        String nombre = (u.getNombre() != null ? u.getNombre().replaceAll("\\s+", "") : "");
        String apellido = (u.getApellido() != null ? u.getApellido().replaceAll("\\s+", "") : "");
        String base = (nombre + apellido).toLowerCase();
        String candidate = base;
        int suffix = 1;
        while (usuarioRepository.findByUsername(candidate) != null) {
            candidate = base + suffix;
            suffix++;
        }
        u.setUsername(candidate);
        u.setPassword(candidate + "123");
        Usuario saved = usuarioRepository.save(u);
        return toDto(saved);
    }

    private UsuarioDto toDto(Usuario u) {
        if (u == null) return null;
        UsuarioDto d = new UsuarioDto();
        d.setUsuario_id(u.getUsuario_id());
        d.setNombre(u.getNombre());
        d.setApellido(u.getApellido());
        d.setNum_telefono(u.getNum_telefono());
        d.setCorreo(u.getCorreo());
        d.setDni(u.getDni());
        d.setRolId(u.getRol() != null ? u.getRol().getId() : null);
        // include username and password when present so UI can show created credentials
        d.setUsername(u.getUsername());
        d.setPassword(u.getPassword());
        return d;
    }

    private Usuario toEntity(UsuarioDto d) {
        Usuario u = new Usuario();
        u.setNombre(d.getNombre());
        u.setApellido(d.getApellido());
        u.setNum_telefono(d.getNum_telefono());
        u.setCorreo(d.getCorreo());
        u.setDni(d.getDni());
        return u;
    }
}
