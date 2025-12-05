-- Create tables for Reparacion, LineaReparacion, and Foto

CREATE TABLE IF NOT EXISTS public.reparacion (
  reparacion_id BIGSERIAL PRIMARY KEY,
  fecha_ingreso DATE,
  fecha_egreso DATE,
  factura_repuestos_pdf VARCHAR(255),
  archivo_ocompra_repuestos_pdf VARCHAR(255),
  responsable VARCHAR(255),
  vehiculo_id BIGINT,
  CONSTRAINT fk_reparacion_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES public.vehiculo(vehiculo_id)
);

CREATE TABLE IF NOT EXISTS public.linea_reparacion (
  linea_reparacion_id BIGSERIAL PRIMARY KEY,
  fecha DATE,
  descripcion VARCHAR(1000),
  reparacion_id BIGINT,
  CONSTRAINT fk_linea_reparacion FOREIGN KEY (reparacion_id) REFERENCES public.reparacion(reparacion_id)
);

CREATE TABLE IF NOT EXISTS public.foto (
  foto_id BIGSERIAL PRIMARY KEY,
  nombre_archivo VARCHAR(255),
  tipo VARCHAR(50),
  linea_reparacion_id BIGINT,
  CONSTRAINT fk_foto_linea_reparacion FOREIGN KEY (linea_reparacion_id) REFERENCES public.linea_reparacion(linea_reparacion_id)
);
