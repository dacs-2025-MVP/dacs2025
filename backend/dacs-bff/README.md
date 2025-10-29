# dacs-bff

Este módulo actúa como Backend-For-Frontend (BFF) para el proyecto DACS.

Resumen rápido
- Context path: `/bff` (configurado en `application.yml`)
- Puerto por defecto: `9001`
- Clientes Feign configurados por variables de entorno:
  - `MS_BACKEND_URL` → URL base del backend (por defecto `http://localhost:9003/backend`)
  - `MS_CONECTOR_URL` → URL base del conector (por defecto `http://localhost:9002/conector`)

Cómo ejecutar (desarrollo)

1) Usando Maven (con variables de entorno si tu backend/conector están en puertos distintos):

```powershell
$env:MS_BACKEND_URL = 'http://localhost:9003/backend'
$env:MS_CONECTOR_URL = 'http://localhost:9002/conector'
cd 'backend\dacs-bff'
mvn spring-boot:run
```

2) Usando el JAR compilado:

```powershell
$env:MS_BACKEND_URL = 'http://localhost:9003/backend'
$env:MS_CONECTOR_URL = 'http://localhost:9002/conector'
cd 'backend\dacs-bff\target'
java -jar dacs-bff-0.0.1-SNAPSHOT.jar
```

Endpoints principales
- `GET /bff/ping` → ping del BFF
- `GET /bff/backendping` → ping al backend
- `GET /bff/conectorping` → ping al conector
- `GET /bff/alumno` → listado de alumnos (delegado al backend)
- `GET /bff/alumno/{id}` → obtener alumno por id
- `POST /bff/alumno` → crear alumno
- `PUT /bff/alumno` → actualizar alumno
- `DELETE /bff/alumno/{id}` → eliminar alumno
- `GET /bff/items` → lista items (delegado al conector)
- `GET /bff/items/{id}` → obtener item por id

Notas
- CORS: por defecto `SecurityConfig` permite `http://localhost:4200`. Cambiar según el dominio de tu frontend.
- Manejo de errores: se agregó un `GlobalExceptionHandler` para devolver respuestas JSON uniformes en errores.
- Autenticación: actualmente el BFF está en modo `permitAll()`; para producción hay que integrar Keycloak/propagación de tokens.

Si querés que agregue ejemplos curl/requests más detallados o tests de integración, lo puedo hacer.
---
# ms-dacs2013-bff 

Microservicio de backend for frontend.

# Levantar en entorno local
```
mvn clean spring-boot:run
```

Opcionalmente se puede agregar el paŕametro:

-P local

```


### API de Prueba

Para chequear que la aplicacion levanto correctamente (Procedemos a consumir el servicio "/metrics/health"):

```
http://localhost:9001/metrics/health
```
