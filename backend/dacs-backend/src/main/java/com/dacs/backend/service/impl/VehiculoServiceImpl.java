package com.dacs.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dacs.backend.dto.VehiculoDto;
import com.dacs.backend.model.entity.Usuario;
import com.dacs.backend.model.entity.Vehiculo;
import com.dacs.backend.model.repository.UsuarioRepository;
import com.dacs.backend.model.repository.VehiculoRepository;
import com.dacs.backend.service.VehiculoService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VehiculoServiceImpl implements VehiculoService {

    private final VehiculoRepository vehiculoRepository;
    private final UsuarioRepository usuarioRepository;
    private final com.dacs.backend.service.ReparacionService reparacionService;

    @Override
    public VehiculoDto create(VehiculoDto dto) {
        Vehiculo v = new Vehiculo();
        v.setPatente(dto.getPatente());
        v.setMarca(dto.getMarca());
        v.setModelo(dto.getModelo());
        v.setColor(dto.getColor());
        if (dto.getClienteId() != null) {
            Usuario u = usuarioRepository.findById(dto.getClienteId()).orElse(null);
            v.setCliente(u);
        }
        Vehiculo saved = vehiculoRepository.save(v);
        return toDto(saved);
    }

    @Override
    public VehiculoDto update(Long id, VehiculoDto dto) {
        Vehiculo v = vehiculoRepository.findById(id).orElseThrow();
        v.setPatente(dto.getPatente());
        v.setMarca(dto.getMarca());
        v.setModelo(dto.getModelo());
        v.setColor(dto.getColor());
        if (dto.getClienteId() != null) {
            Usuario u = usuarioRepository.findById(dto.getClienteId()).orElse(null);
            v.setCliente(u);
        }
        return toDto(vehiculoRepository.save(v));
    }

    @Override
    public void delete(Long id) {
        vehiculoRepository.deleteById(id);
    }

    @Override
    public VehiculoDto findById(Long id) {
        return vehiculoRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<VehiculoDto> findAll() {
        return vehiculoRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public java.util.List<com.dacs.backend.dto.ReparacionDto> findReparacionesByVehiculo(Long vehiculoId) {
        return reparacionService.findByVehiculoId(vehiculoId);
    }

    private VehiculoDto toDto(Vehiculo v) {
        VehiculoDto d = new VehiculoDto();
        d.setVehiculo_id(v.getVehiculo_id());
        d.setPatente(v.getPatente());
        d.setMarca(v.getMarca());
        d.setModelo(v.getModelo());
        d.setColor(v.getColor());
        d.setClienteId(v.getCliente() != null ? v.getCliente().getUsuario_id() : null);
        return d;
    }
}
