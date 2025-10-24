package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.LineaPresupuestoDto;

public interface LineaPresupuestoService {
    LineaPresupuestoDto create(LineaPresupuestoDto dto);
    LineaPresupuestoDto update(Long id, LineaPresupuestoDto dto);
    void delete(Long id);
    LineaPresupuestoDto findById(Long id);
    List<LineaPresupuestoDto> findAll();
}
