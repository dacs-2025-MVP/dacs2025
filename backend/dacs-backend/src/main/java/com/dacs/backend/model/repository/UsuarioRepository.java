package com.dacs.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dacs.backend.model.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	java.util.List<Usuario> findByUsernameIsNull();
	java.util.List<Usuario> findByUsernameIsNotNull();
	Usuario findByUsername(String username);
}
