package com.dacs.backend.model.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class LineaReparacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long linea_reparacion_id;

    private LocalDate fecha;
    private String responsable;
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reparacion_id")
    private Reparacion reparacion;

}
