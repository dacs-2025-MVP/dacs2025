package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.RolDto;

public interface RolService {
    RolDto create(RolDto dto);
    RolDto update(Long id, RolDto dto);
    void delete(Long id);
    RolDto findById(Long id);
    List<RolDto> findAll();
}
