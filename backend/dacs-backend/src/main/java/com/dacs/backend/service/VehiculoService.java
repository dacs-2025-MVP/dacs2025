package com.dacs.backend.service;

import java.util.List;

import com.dacs.backend.dto.VehiculoDto;

public interface VehiculoService {
    VehiculoDto create(VehiculoDto dto);
    VehiculoDto update(Long id, VehiculoDto dto);
    void delete(Long id);
    VehiculoDto findById(Long id);
    List<VehiculoDto> findAll();
    // Obtener reparaciones asociadas a un vehículo
    java.util.List<com.dacs.backend.dto.ReparacionDto> findReparacionesByVehiculo(Long vehiculoId);
}
