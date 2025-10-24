package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.LineaReparacionDto;

public interface LineaReparacionService {
    LineaReparacionDto create(LineaReparacionDto dto);
    LineaReparacionDto update(Long id, LineaReparacionDto dto);
    void delete(Long id);
    LineaReparacionDto findById(Long id);
    List<LineaReparacionDto> findAll();
}
