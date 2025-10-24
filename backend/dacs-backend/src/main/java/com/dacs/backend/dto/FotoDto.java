package com.dacs.backend.dto;

import lombok.Data;

@Data
public class FotoDto {
    private Long foto_id;
    private String nombreArchivo;
    private Long lineaReparacionId;
}
