-- Add missing columns added by recent code changes
-- Run this against the PostgreSQL database used by the app

ALTER TABLE usuario
  ADD COLUMN IF NOT EXISTS username VARCHAR(255),
  ADD COLUMN IF NOT EXISTS password VARCHAR(255);

ALTER TABLE vehiculo
  ADD COLUMN IF NOT EXISTS modelo VARCHAR(255),
  ADD COLUMN IF NOT EXISTS color VARCHAR(255);
