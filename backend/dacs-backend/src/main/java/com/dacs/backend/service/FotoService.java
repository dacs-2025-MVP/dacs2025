package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.FotoDto;

public interface FotoService {
    FotoDto create(FotoDto dto);
    FotoDto update(Long id, FotoDto dto);
    void delete(Long id);
    FotoDto findById(Long id);
    List<FotoDto> findAll();
}
