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
        usuarioRepository.deleteById(id);
    }

    @Override
    public UsuarioDto findById(Long id) {
        return usuarioRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<UsuarioDto> findAll() {
        return usuarioRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
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
