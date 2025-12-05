package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.ReparacionDto;
import com.dacs.backend.dto.ReparacionDetailDTO;

public interface ReparacionService {
    ReparacionDto create(ReparacionDto dto);
    ReparacionDto update(Long id, ReparacionDto dto);
    void delete(Long id);
    ReparacionDto findById(Long id);
    List<ReparacionDto> findAll();
    // Obtener reparaciones por vehiculo
    List<ReparacionDto> findByVehiculoId(Long vehiculoId);
    ReparacionDetailDTO getReparacionDetails(Long id);
}
