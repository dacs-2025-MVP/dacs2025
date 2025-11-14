package com.dacs.bff.dto;

import lombok.Data;

@Data
public class UsuarioDto {
    private Long usuario_id;
    private String nombre;
    private String apellido;
    private String num_telefono;
    private String correo;
    private String dni;
    private Long rolId;
}
