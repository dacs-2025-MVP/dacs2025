package com.dacs.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dacs.backend.model.entity.Reparacion;

@Repository
public interface ReparacionRepository extends JpaRepository<Reparacion, Long> {
	// Buscar reparaciones por el id del vehículo asociado usando JPQL
	@Query("select r from Reparacion r where r.vehiculo.vehiculo_id = :vehiculoId")
	java.util.List<Reparacion> findByVehiculoId(@Param("vehiculoId") Long vehiculoId);
}
