package com.dacs.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dacs.backend.dto.ReparacionDto;
import com.dacs.backend.model.entity.Reparacion;
import com.dacs.backend.model.entity.Vehiculo;
import com.dacs.backend.model.repository.ReparacionRepository;
import com.dacs.backend.model.repository.VehiculoRepository;
import com.dacs.backend.service.ReparacionService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReparacionServiceImpl implements ReparacionService {

    private final ReparacionRepository reparacionRepository;
    private final VehiculoRepository vehiculoRepository;

    @Override
    public ReparacionDto create(ReparacionDto dto) {
        Reparacion r = new Reparacion();
        r.setFecha_ingreso(dto.getFecha_ingreso());
        r.setFecha_egreso(dto.getFecha_egreso());
        r.setFactura_repuestos_pdf(dto.getFactura_repuestos_pdf());
        r.setArchivo_ocompra_repuestos_pdf(dto.getArchivo_ocompra_repuestos_pdf());
        if (dto.getVehiculoId() != null) {
            Vehiculo v = vehiculoRepository.findById(dto.getVehiculoId()).orElse(null);
            r.setVehiculo(v);
        }
        return toDto(reparacionRepository.save(r));
    }

    @Override
    public ReparacionDto update(Long id, ReparacionDto dto) {
        Reparacion r = reparacionRepository.findById(id).orElseThrow();
        r.setFecha_ingreso(dto.getFecha_ingreso());
        r.setFecha_egreso(dto.getFecha_egreso());
        r.setFactura_repuestos_pdf(dto.getFactura_repuestos_pdf());
        r.setArchivo_ocompra_repuestos_pdf(dto.getArchivo_ocompra_repuestos_pdf());
        if (dto.getVehiculoId() != null) {
            Vehiculo v = vehiculoRepository.findById(dto.getVehiculoId()).orElse(null);
            r.setVehiculo(v);
        }
        return toDto(reparacionRepository.save(r));
    }

    @Override
    public void delete(Long id) {
        reparacionRepository.deleteById(id);
    }

    @Override
    public ReparacionDto findById(Long id) {
        return reparacionRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<ReparacionDto> findAll() {
        return reparacionRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private ReparacionDto toDto(Reparacion r) {
        ReparacionDto d = new ReparacionDto();
        d.setReparacion_id(r.getReparacion_id());
        d.setFecha_ingreso(r.getFecha_ingreso());
        d.setFecha_egreso(r.getFecha_egreso());
        d.setFactura_repuestos_pdf(r.getFactura_repuestos_pdf());
        d.setArchivo_ocompra_repuestos_pdf(r.getArchivo_ocompra_repuestos_pdf());
        d.setVehiculoId(r.getVehiculo() != null ? r.getVehiculo().getVehiculo_id() : null);
        return d;
    }
}
