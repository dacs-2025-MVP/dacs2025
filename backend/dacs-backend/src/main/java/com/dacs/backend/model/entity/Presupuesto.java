package com.dacs.backend.model.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Presupuesto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long presupuesto_id;

    private Integer codigo;
    private LocalDate fecha_emision;
    private String patente_vehiculo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
