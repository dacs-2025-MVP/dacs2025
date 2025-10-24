package com.dacs.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class LineaReparacionDto {
    private Long linea_reparacion_id;
    private LocalDate fecha;
    private String responsable;
    private String descripcion;
    private Long reparacionId;
}
