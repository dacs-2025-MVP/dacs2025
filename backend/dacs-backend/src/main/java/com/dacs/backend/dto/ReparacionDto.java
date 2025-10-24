package com.dacs.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ReparacionDto {
    private Long reparacion_id;
    private LocalDate fecha_ingreso;
    private LocalDate fecha_egreso;
    private String factura_repuestos_pdf;
    private String archivo_ocompra_repuestos_pdf;
    private Long vehiculoId;
}
