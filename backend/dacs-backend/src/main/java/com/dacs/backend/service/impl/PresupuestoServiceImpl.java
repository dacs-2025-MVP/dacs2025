package com.dacs.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dacs.backend.dto.PresupuestoDto;
import com.dacs.backend.model.entity.Presupuesto;
import com.dacs.backend.model.entity.Usuario;
import com.dacs.backend.model.repository.PresupuestoRepository;
import com.dacs.backend.model.repository.UsuarioRepository;
import com.dacs.backend.service.PresupuestoService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PresupuestoServiceImpl implements PresupuestoService {

    private final PresupuestoRepository presupuestoRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public PresupuestoDto create(PresupuestoDto dto) {
        Presupuesto p = new Presupuesto();
        p.setCodigo(dto.getCodigo());
        p.setFecha_emision(dto.getFecha_emision());
        p.setPatente_vehiculo(dto.getPatente_vehiculo());
        if (dto.getUsuarioId() != null) {
            Usuario u = usuarioRepository.findById(dto.getUsuarioId()).orElse(null);
            p.setUsuario(u);
        }
        return toDto(presupuestoRepository.save(p));
    }

    @Override
    public PresupuestoDto update(Long id, PresupuestoDto dto) {
        Presupuesto p = presupuestoRepository.findById(id).orElseThrow();
        p.setCodigo(dto.getCodigo());
        p.setFecha_emision(dto.getFecha_emision());
        p.setPatente_vehiculo(dto.getPatente_vehiculo());
        if (dto.getUsuarioId() != null) {
            Usuario u = usuarioRepository.findById(dto.getUsuarioId()).orElse(null);
            p.setUsuario(u);
        }
        return toDto(presupuestoRepository.save(p));
    }

    @Override
    public void delete(Long id) {
        presupuestoRepository.deleteById(id);
    }

    @Override
    public PresupuestoDto findById(Long id) {
        return presupuestoRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<PresupuestoDto> findAll() {
        return presupuestoRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private PresupuestoDto toDto(Presupuesto p) {
        PresupuestoDto d = new PresupuestoDto();
        d.setPresupuesto_id(p.getPresupuesto_id());
        d.setCodigo(p.getCodigo());
        d.setFecha_emision(p.getFecha_emision());
        d.setPatente_vehiculo(p.getPatente_vehiculo());
        d.setUsuarioId(p.getUsuario() != null ? p.getUsuario().getUsuario_id() : null);
        return d;
    }
}
