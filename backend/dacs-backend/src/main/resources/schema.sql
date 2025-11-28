-- Schema updates for local development
-- Add missing columns that were added to entities but not present in the
-- existing H2 file database. This file runs on Spring Boot startup (if
-- `spring.sql.init.mode`/legacy `spring.datasource.initialize` is enabled)
-- and uses H2's "IF NOT EXISTS" form to be idempotent.

ALTER TABLE IF EXISTS USUARIO ADD COLUMN IF NOT EXISTS USERNAME VARCHAR(255);
ALTER TABLE IF EXISTS USUARIO ADD COLUMN IF NOT EXISTS PASSWORD VARCHAR(255);

ALTER TABLE IF EXISTS VEHICULO ADD COLUMN IF NOT EXISTS MODELO VARCHAR(255);
ALTER TABLE IF EXISTS VEHICULO ADD COLUMN IF NOT EXISTS COLOR VARCHAR(255);

-- You can extend this file with further ALTERs when adding fields.
