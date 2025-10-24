package com.dacs.backend.dto;

import com.dacs.backend.model.entity.TipoRol;
import lombok.Data;

@Data
public class RolDto {
    private Long id;
    private TipoRol tipoRol;
}
