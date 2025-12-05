package com.dacs.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dacs.backend.dto.LineaReparacionDto;
import com.dacs.backend.model.entity.LineaReparacion;
import com.dacs.backend.model.entity.Reparacion;
import com.dacs.backend.model.repository.LineaReparacionRepository;
import com.dacs.backend.model.repository.ReparacionRepository;
import com.dacs.backend.service.LineaReparacionService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LineaReparacionServiceImpl implements LineaReparacionService {

    private final LineaReparacionRepository lineaRepo;
    private final ReparacionRepository reparacionRepo;

    @Override
    public LineaReparacionDto create(LineaReparacionDto dto) {
        LineaReparacion l = new LineaReparacion();
        l.setFecha(dto.getFecha());
        l.setDescripcion(dto.getDescripcion());
        l.setCosto(dto.getCosto());
        if (dto.getReparacionId() != null) {
            Reparacion r = reparacionRepo.findById(dto.getReparacionId()).orElse(null);
            l.setReparacion(r);
        }
        return toDto(lineaRepo.save(l));
    }

    @Override
    public LineaReparacionDto update(Long id, LineaReparacionDto dto) {
        LineaReparacion l = lineaRepo.findById(id).orElseThrow();
        l.setFecha(dto.getFecha());
        l.setDescripcion(dto.getDescripcion());
        l.setCosto(dto.getCosto());
        if (dto.getReparacionId() != null) {
            Reparacion r = reparacionRepo.findById(dto.getReparacionId()).orElse(null);
            l.setReparacion(r);
        }
        return toDto(lineaRepo.save(l));
    }

    @Override
    public void delete(Long id) {
        lineaRepo.deleteById(id);
    }

    @Override
    public LineaReparacionDto findById(Long id) {
        return lineaRepo.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<LineaReparacionDto> findAll() {
        return lineaRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<LineaReparacionDto> findByReparacionId(Long reparacionId) {
        return lineaRepo.findByReparacionId(reparacionId).stream().map(this::toDto).collect(Collectors.toList());
    }

    private LineaReparacionDto toDto(LineaReparacion l) {
        LineaReparacionDto d = new LineaReparacionDto();
        d.setLinea_reparacion_id(l.getLinea_reparacion_id());
        d.setFecha(l.getFecha());
        d.setDescripcion(l.getDescripcion());
        d.setCosto(l.getCosto());
        d.setReparacionId(l.getReparacion() != null ? l.getReparacion().getReparacion_id() : null);
        return d;
    }
}
