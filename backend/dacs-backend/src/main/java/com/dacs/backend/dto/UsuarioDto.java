package com.dacs.backend.dto;

import lombok.Data;

@Data
public class UsuarioDto {
    private Long usuario_id;
    private String nombre;
    private String apellido;
    private String num_telefono;
    private String correo;
    private String dni;
    // optional app username (when this client has an associated app user)
    private String username;
    // plain-text password (returned on creation for operator to share). For prototype only.
    private String password;
    private Long rolId;
}
