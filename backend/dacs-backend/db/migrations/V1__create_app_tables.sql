-- Create application tables for Usuario, Vehiculo and Rol (if they don't exist)
CREATE TABLE IF NOT EXISTS public.rol (
  id BIGSERIAL PRIMARY KEY,
  tipo_rol VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS public.usuario (
  usuario_id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  num_telefono VARCHAR(50),
  correo VARCHAR(255),
  dni VARCHAR(50),
  rol_id BIGINT,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.vehiculo (
  vehiculo_id BIGSERIAL PRIMARY KEY,
  patente VARCHAR(100),
  marca VARCHAR(255),
  modelo VARCHAR(255),
  color VARCHAR(255),
  cliente_id BIGINT
);

-- Optional: add foreign keys if desired (commented out for safety)
-- ALTER TABLE public.usuario ADD CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES public.rol(id);
-- ALTER TABLE public.vehiculo ADD CONSTRAINT fk_vehiculo_cliente FOREIGN KEY (cliente_id) REFERENCES public.usuario(usuario_id);
