/* 
   SCRIPT DE LIMPIEZA DE DATOS (NO BORRA TABLAS)
   
   Este script elimina TODOS los registros de las tablas de negocio
   y reinicia los contadores de ID a 1.
   
   NO borra la estructura de las tablas ni la tabla de migraciones (flyway).
*/

TRUNCATE TABLE 
    public.foto, 
    public.linea_reparacion, 
    public.reparacion, 
    public.vehiculo, 
    public.usuario, 
    public.rol 
RESTART IDENTITY CASCADE;
