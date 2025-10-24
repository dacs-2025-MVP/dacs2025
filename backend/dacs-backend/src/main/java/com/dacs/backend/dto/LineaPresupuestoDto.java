package com.dacs.backend.dto;

import lombok.Data;

@Data
public class LineaPresupuestoDto {
    private Long id;
    private String nombre_repuesto;
    private Integer cantidad;
    private Double precio_unidad;
    private Double total;
    private String detalle_reparacion;
    private Long presupuestoId;
}
