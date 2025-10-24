package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.ReparacionDto;

public interface ReparacionService {
    ReparacionDto create(ReparacionDto dto);
    ReparacionDto update(Long id, ReparacionDto dto);
    void delete(Long id);
    ReparacionDto findById(Long id);
    List<ReparacionDto> findAll();
}
