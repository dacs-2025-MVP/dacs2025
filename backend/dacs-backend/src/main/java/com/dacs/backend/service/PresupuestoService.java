package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.PresupuestoDto;

public interface PresupuestoService {
    PresupuestoDto create(PresupuestoDto dto);
    PresupuestoDto update(Long id, PresupuestoDto dto);
    void delete(Long id);
    PresupuestoDto findById(Long id);
    List<PresupuestoDto> findAll();
}
