package com.dacs.backend.dto;

import lombok.Data;

@Data
public class VehiculoDto {
    private Long vehiculo_id;
    private String patente;
    private String marca;
    private Long clienteId;
}
