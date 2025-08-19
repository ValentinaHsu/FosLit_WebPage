-- Migración para crear tabla productos
-- Compatible con SQLite y PostgreSQL

-- Para PostgreSQL
CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  cantidad INTEGER NOT NULL DEFAULT 0 CHECK (cantidad >= 0),
  modelo VARCHAR(100),
  color VARCHAR(50),
  precio_unidad NUMERIC(10,2) NOT NULL CHECK (precio_unidad >= 0),
  precio_bulto NUMERIC(10,2) NOT NULL CHECK (precio_bulto >= 0),
  descripcion TEXT,
  fotos JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_tipo ON productos(tipo);
CREATE INDEX IF NOT EXISTS idx_productos_color ON productos(color);
CREATE INDEX IF NOT EXISTS idx_productos_nombre_modelo ON productos(nombre, modelo);

-- Trigger para actualizar updated_at automáticamente (PostgreSQL)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_productos_updated_at 
  BEFORE UPDATE ON productos 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();