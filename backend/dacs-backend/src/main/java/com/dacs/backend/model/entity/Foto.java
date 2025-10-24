package com.dacs.backend.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Foto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foto_id;

    private String nombreArchivo;
    private String tipo = "JPG";

    @ManyToOne
    @JoinColumn(name = "linea_reparacion_id")
    private LineaReparacion lineaReparacion;
}
