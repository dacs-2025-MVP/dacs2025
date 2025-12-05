package com.dacs.backend.dto;

import java.time.LocalDate;
import java.math.BigDecimal;

import lombok.Data;

@Data
public class LineaReparacionDto {
    private Long linea_reparacion_id;
    private LocalDate fecha;
    private String descripcion;
    private BigDecimal costo;
    private Long reparacionId;
}
