package com.dacs.bff.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dacs.bff.api.client.ApiBackendClient;
import com.dacs.bff.api.client.ApiConectorClient;
import com.dacs.bff.dto.AlumnoDto;
import com.dacs.bff.dto.UsuarioDto;

@Service
public class ApiBackendServiceImpl implements ApiBackendService {

	@Autowired
	private ApiBackendClient apiBackendClient;

	@Autowired
	private ApiConectorClient apiConectorClient;

	@Override
	public String ping() {
		return apiBackendClient.ping();
	}

	@Override
	public AlumnoDto getAlumnoById(Long id) throws Exception {
		// TODO validar parametro y lanzar exepcion
		return apiBackendClient.alumnoById(id);
	}

	@Override
	public List<AlumnoDto> getAlumnos() {
		// TODO Auto-generated method stub
		return apiBackendClient.alumnos();
	}

	@Override
	public AlumnoDto savesAlumno(AlumnoDto alumno) throws Exception {
		// TODO validar parametro y lanzar exepcion
		return apiBackendClient.save(alumno);
	}

	@Override
	public AlumnoDto updateAlumno(AlumnoDto alumno) throws Exception {
		// TODO validar parametro y lanzar exepcion
		return apiBackendClient.update(alumno);
	}

	@Override
	public AlumnoDto deleteAlumno(Long id) throws Exception {
		// TODO validar parametro y lanzar exepcion
		return apiBackendClient.delete(id);
	}

	@Override
	public java.util.List<UsuarioDto> getUsuarios() {
		return apiBackendClient.usuarios();
	}

	@Override
	public UsuarioDto getUsuarioById(Long id) throws Exception {
		return apiBackendClient.usuarioById(id);
	}

	@Override
	public void deleteUsuario(Long id) throws Exception {
		apiBackendClient.deleteUsuario(id);
	}

	@Override
	public UsuarioDto createUsuario(UsuarioDto dto) throws Exception {
		return apiBackendClient.saveUsuario(dto);
	}

	@Override
	public java.util.List<UsuarioDto> getAppUsers() {
		return apiBackendClient.usuariosApp();
	}

	@Override
	public java.util.List<UsuarioDto> getAvailableForUser() {
		return apiBackendClient.availableForUser();
	}

	@Override
	public UsuarioDto createUserForCliente(java.util.Map<String, Object> body) throws Exception {
		return apiBackendClient.createUserForCliente(body);
	}

	@Override
	public UsuarioDto updateUsuario(Long id, UsuarioDto dto) throws Exception {
		return apiBackendClient.updateUsuario(id, dto);
	}

	@Override
    public Map<String, Object> verifyDni(String documentNumber) throws Exception {
		try {
			return apiConectorClient.nosisByDni(documentNumber);
		} catch (Exception e) {
			// Log and return a friendly error response so BFF does not hang the frontend
			java.util.Map<String, Object> err = new java.util.HashMap<>();
			err.put("error", true);
			err.put("message", "Error verificando DNI: " + e.getMessage());
			return err;
		}
	}

    @Override
    public Map<String, Object> getReparacionById(Long id) {
        return apiBackendClient.getReparacionById(id);
    }

    @Override
    public Map<String, Object> getReparacionDetails(Long id) {
        return apiBackendClient.getReparacionDetails(id);
    }

    @Override
    public Map<String, Object> updateReparacion(Long id, Map<String, Object> reparacionDto) {
        return apiBackendClient.updateReparacion(id, reparacionDto);
    }

    @Override
    public void deleteReparacion(Long id) {
        apiBackendClient.deleteReparacion(id);
    }

    @Override
    public List<Map<String, Object>> getLineasReparacion(Long id) {
        return apiBackendClient.getLineasReparacion(id);
    }

    @Override
    public Map<String, Object> addLineaReparacion(Long id, Map<String, Object> lineaDto) {
        return apiBackendClient.addLineaReparacion(id, lineaDto);
    }

    @Override
    public Map<String, Object> updateLineaReparacion(Long id, Map<String, Object> lineaDto) {
        return apiBackendClient.updateLineaReparacion(id, lineaDto);
    }

    @Override
    public void deleteLineaReparacion(Long id) {
        apiBackendClient.deleteLineaReparacion(id);
    }
}
