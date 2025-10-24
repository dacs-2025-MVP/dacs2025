package com.dacs.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dacs.backend.dto.FotoDto;
import com.dacs.backend.model.entity.Foto;
import com.dacs.backend.model.entity.LineaReparacion;
import com.dacs.backend.model.repository.FotoRepository;
import com.dacs.backend.model.repository.LineaReparacionRepository;
import com.dacs.backend.service.FotoService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FotoServiceImpl implements FotoService {

    private final FotoRepository fotoRepository;
    private final LineaReparacionRepository lineaRepo;

    @Override
    public FotoDto create(FotoDto dto) {
        Foto f = new Foto();
        f.setNombreArchivo(dto.getNombreArchivo());
        if (dto.getLineaReparacionId() != null) {
            LineaReparacion l = lineaRepo.findById(dto.getLineaReparacionId()).orElse(null);
            f.setLineaReparacion(l);
        }
        return toDto(fotoRepository.save(f));
    }

    @Override
    public FotoDto update(Long id, FotoDto dto) {
        Foto f = fotoRepository.findById(id).orElseThrow();
        f.setNombreArchivo(dto.getNombreArchivo());
        if (dto.getLineaReparacionId() != null) {
            LineaReparacion l = lineaRepo.findById(dto.getLineaReparacionId()).orElse(null);
            f.setLineaReparacion(l);
        }
        return toDto(fotoRepository.save(f));
    }

    @Override
    public void delete(Long id) {
        fotoRepository.deleteById(id);
    }

    @Override
    public FotoDto findById(Long id) {
        return fotoRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<FotoDto> findAll() {
        return fotoRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private FotoDto toDto(Foto f) {
        FotoDto d = new FotoDto();
        d.setFoto_id(f.getFoto_id());
        d.setNombreArchivo(f.getNombreArchivo());
        d.setLineaReparacionId(f.getLineaReparacion() != null ? f.getLineaReparacion().getLinea_reparacion_id() : null);
        return d;
    }
}
