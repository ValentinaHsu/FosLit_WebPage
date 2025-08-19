-- Migración para SQLite
-- SQLite no soporta SERIAL, JSONB, ni triggers complejos

CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL,
  tipo TEXT NOT NULL,
  cantidad INTEGER NOT NULL DEFAULT 0 CHECK (cantidad >= 0),
  modelo TEXT,
  color TEXT,
  precio_unidad REAL NOT NULL CHECK (precio_unidad >= 0),
  precio_bulto REAL NOT NULL CHECK (precio_bulto >= 0),
  descripcion TEXT,
  fotos TEXT DEFAULT '[]',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_tipo ON productos(tipo);
CREATE INDEX IF NOT EXISTS idx_productos_color ON productos(color);
CREATE INDEX IF NOT EXISTS idx_productos_nombre_modelo ON productos(nombre, modelo);

-- Trigger para actualizar updated_at automáticamente (SQLite)
CREATE TRIGGER IF NOT EXISTS update_productos_updated_at 
  AFTER UPDATE ON productos
  FOR EACH ROW
  BEGIN
    UPDATE productos SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END;