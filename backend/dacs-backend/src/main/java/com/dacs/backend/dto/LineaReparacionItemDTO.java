package com.dacs.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class LineaReparacionItemDTO {
    private String descripcion;
    private BigDecimal costo;
    private LocalDate fecha;
}
