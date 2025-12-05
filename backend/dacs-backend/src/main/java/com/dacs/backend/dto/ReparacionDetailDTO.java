package com.dacs.backend.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ReparacionDetailDTO extends ReparacionDto {
    private List<LineaReparacionDto> lineasReparacion;
}
