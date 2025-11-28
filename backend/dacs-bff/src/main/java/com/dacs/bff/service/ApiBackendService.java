package com.dacs.bff.service;

import java.util.List;

import com.dacs.bff.dto.AlumnoDto;
import com.dacs.bff.dto.UsuarioDto;

public interface ApiBackendService {

	public String ping();

	public AlumnoDto getAlumnoById(Long id) throws Exception;

	public List<AlumnoDto> getAlumnos();

	public AlumnoDto savesAlumno(AlumnoDto alumno) throws Exception;

	public AlumnoDto updateAlumno(AlumnoDto alumno) throws Exception;

	public AlumnoDto deleteAlumno(Long id) throws Exception;

	public List<UsuarioDto> getUsuarios();

	public UsuarioDto getUsuarioById(Long id) throws Exception;

	public UsuarioDto createUsuario(UsuarioDto dto) throws Exception;

	public java.util.List<UsuarioDto> getAppUsers();

	public java.util.List<UsuarioDto> getAvailableForUser();

	public UsuarioDto createUserForCliente(java.util.Map<String, Object> body) throws Exception;

	public UsuarioDto updateUsuario(Long id, UsuarioDto dto) throws Exception;

	public void deleteUsuario(Long id) throws Exception;

	public java.util.Map<String, Object> verifyDni(String documentNumber) throws Exception;
}
