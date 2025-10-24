package com.dacs.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dacs.backend.dto.RolDto;
import com.dacs.backend.model.entity.Rol;
import com.dacs.backend.model.repository.RolRepository;
import com.dacs.backend.service.RolService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RolServiceImpl implements RolService {

    private final RolRepository rolRepository;

    @Override
    public RolDto create(RolDto dto) {
        Rol r = new Rol();
        r.setTipoRol(dto.getTipoRol());
        return toDto(rolRepository.save(r));
    }

    @Override
    public RolDto update(Long id, RolDto dto) {
        Rol r = rolRepository.findById(id).orElseThrow();
        r.setTipoRol(dto.getTipoRol());
        return toDto(rolRepository.save(r));
    }

    @Override
    public void delete(Long id) {
        rolRepository.deleteById(id);
    }

    @Override
    public RolDto findById(Long id) {
        return rolRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<RolDto> findAll() {
        return rolRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private RolDto toDto(Rol r) {
        RolDto d = new RolDto();
        d.setId(r.getId());
        d.setTipoRol(r.getTipoRol());
        return d;
    }
}
