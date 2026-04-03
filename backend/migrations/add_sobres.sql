-- Agregar columnas de sobres a la tabla usuarios si no existen
ALTER TABLE usuarios
ADD COLUMN IF NOT EXISTS sobres_disponibles INTEGER DEFAULT 2,
ADD COLUMN IF NOT EXISTS ultimo_sobre_abierto TIMESTAMP DEFAULT NULL;

-- Setear valor inicial para usuarios existentes
UPDATE usuarios 
SET sobres_disponibles = 2 
WHERE sobres_disponibles IS NULL;
