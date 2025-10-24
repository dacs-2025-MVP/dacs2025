package com.dacs.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dacs.backend.dto.LineaPresupuestoDto;
import com.dacs.backend.model.entity.LineaPresupuesto;
import com.dacs.backend.model.entity.Presupuesto;
import com.dacs.backend.model.repository.LineaPresupuestoRepository;
import com.dacs.backend.model.repository.PresupuestoRepository;
import com.dacs.backend.service.LineaPresupuestoService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LineaPresupuestoServiceImpl implements LineaPresupuestoService {

    private final LineaPresupuestoRepository lineaRepo;
    private final PresupuestoRepository presupuestoRepo;

    @Override
    public LineaPresupuestoDto create(LineaPresupuestoDto dto) {
        LineaPresupuesto l = new LineaPresupuesto();
        l.setNombre_repuesto(dto.getNombre_repuesto());
        l.setCantidad(dto.getCantidad());
        l.setPrecio_unidad(dto.getPrecio_unidad());
        l.setTotal(dto.getTotal());
        l.setDetalle_reparacion(dto.getDetalle_reparacion());
        if (dto.getPresupuestoId() != null) {
            Presupuesto p = presupuestoRepo.findById(dto.getPresupuestoId()).orElse(null);
            l.setPresupuesto(p);
        }
        return toDto(lineaRepo.save(l));
    }

    @Override
    public LineaPresupuestoDto update(Long id, LineaPresupuestoDto dto) {
        LineaPresupuesto l = lineaRepo.findById(id).orElseThrow();
        l.setNombre_repuesto(dto.getNombre_repuesto());
        l.setCantidad(dto.getCantidad());
        l.setPrecio_unidad(dto.getPrecio_unidad());
        l.setTotal(dto.getTotal());
        l.setDetalle_reparacion(dto.getDetalle_reparacion());
        if (dto.getPresupuestoId() != null) {
            Presupuesto p = presupuestoRepo.findById(dto.getPresupuestoId()).orElse(null);
            l.setPresupuesto(p);
        }
        return toDto(lineaRepo.save(l));
    }

    @Override
    public void delete(Long id) {
        lineaRepo.deleteById(id);
    }

    @Override
    public LineaPresupuestoDto findById(Long id) {
        return lineaRepo.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<LineaPresupuestoDto> findAll() {
        return lineaRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private LineaPresupuestoDto toDto(LineaPresupuesto l) {
        LineaPresupuestoDto d = new LineaPresupuestoDto();
        d.setId(l.getId());
        d.setNombre_repuesto(l.getNombre_repuesto());
        d.setCantidad(l.getCantidad());
        d.setPrecio_unidad(l.getPrecio_unidad());
        d.setTotal(l.getTotal());
        d.setDetalle_reparacion(l.getDetalle_reparacion());
        d.setPresupuestoId(l.getPresupuesto() != null ? l.getPresupuesto().getPresupuesto_id() : null);
        return d;
    }
}
