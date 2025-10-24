package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.VehiculoDto;

public interface VehiculoService {
    VehiculoDto create(VehiculoDto dto);
    VehiculoDto update(Long id, VehiculoDto dto);
    void delete(Long id);
    VehiculoDto findById(Long id);
    List<VehiculoDto> findAll();
}
