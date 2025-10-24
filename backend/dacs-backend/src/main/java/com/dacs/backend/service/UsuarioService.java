package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.UsuarioDto;

public interface UsuarioService {
    UsuarioDto create(UsuarioDto dto);
    UsuarioDto update(Long id, UsuarioDto dto);
    void delete(Long id);
    UsuarioDto findById(Long id);
    List<UsuarioDto> findAll();
}
