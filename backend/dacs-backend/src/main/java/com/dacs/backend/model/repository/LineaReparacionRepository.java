package com.dacs.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dacs.backend.model.entity.LineaReparacion;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface LineaReparacionRepository extends JpaRepository<LineaReparacion, Long> {
	@Query("select l from LineaReparacion l where l.reparacion.reparacion_id = :rid order by l.fecha desc")
	LineaReparacion findLatestByReparacionId(@Param("rid") Long reparacionId);
	@Query("select l from LineaReparacion l where l.reparacion.reparacion_id = :rid order by l.fecha asc")
	java.util.List<LineaReparacion> findByReparacionId(@Param("rid") Long reparacionId);
}
