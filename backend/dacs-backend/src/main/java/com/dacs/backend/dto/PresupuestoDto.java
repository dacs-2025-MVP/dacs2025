package com.dacs.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class PresupuestoDto {
    private Long presupuesto_id;
    private Integer codigo;
    private LocalDate fecha_emision;
    private String patente_vehiculo;
    private Long usuarioId;
}
