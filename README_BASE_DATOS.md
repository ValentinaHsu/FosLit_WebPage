# 🗄️ Base de Datos para FosLit WebPage

## 📋 Resumen del Proyecto

Se ha implementado una base de datos completa con backend API para gestionar productos, reemplazando los datos mock del frontend con información real desde la base de datos.

## 🏗️ Arquitectura Implementada

```
FosLit_WebPage/
├── backend/                     # Servidor Node.js + Express
│   ├── config/database.js       # Configuración BD (SQLite/PostgreSQL)
│   ├── models/Producto.js       # Modelo de datos de productos
│   ├── controllers/productosController.js # Lógica de negocio
│   ├── validators/productoValidator.js    # Validaciones con Joi
│   ├── routes/productos.js      # Rutas REST API
│   ├── migrations/              # Scripts SQL para crear tablas
│   ├── seeds/                   # Datos de prueba
│   ├── scripts/                 # Scripts de migración y seed
│   └── server.js                # Servidor principal
├── src/services/products.js     # Cliente API para el frontend
├── public/products/             # Imágenes públicas
└── package-backend.json         # Dependencias del backend
```

## 🗃️ Esquema de Base de Datos

### Tabla `productos`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER/SERIAL | PK, auto-incremental |
| `nombre` | VARCHAR(255) | Nombre del producto |
| `categoria` | VARCHAR(100) | Categoría del producto |
| `tipo` | VARCHAR(100) | Tipo/subtipo del producto |
| `cantidad` | INTEGER | Stock disponible (≥ 0) |
| `modelo` | VARCHAR(100) | Modelo del producto (opcional) |
| `color` | VARCHAR(50) | Color del producto (opcional) |
| `precio_unidad` | NUMERIC(10,2) | Precio por unidad (≥ 0) |
| `precio_bulto` | NUMERIC(10,2) | Precio por bulto (≥ 0) |
| `descripcion` | TEXT | Descripción del producto |
| `fotos` | JSON/JSONB | Array de URLs de imágenes |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Fecha de actualización |

#### Índices:
- `categoria`, `tipo`, `color` (individuales)
- `nombre, modelo` (compuesto)

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias del Backend

```bash
# Navegar a la raíz del proyecto
cd /path/to/FosLit_WebPage

# Instalar dependencias del backend
npm install --save express cors dotenv sqlite3 pg joi
npm install --save-dev nodemon
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
# Desarrollo (SQLite)
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Producción (PostgreSQL) - opcional
# DATABASE_URL=postgresql://usuario:password@localhost:5432/foslit_db
```

### 3. Ejecutar Migraciones y Seeds

```bash
# Crear tabla y estructura
node backend/scripts/migrate.js

# Cargar datos de prueba
node backend/scripts/seed.js

# O ambos a la vez
npm run reset  # (después de agregar scripts a package.json)
```

### 4. Iniciar el Servidor

```bash
# Desarrollo
node backend/server.js
# o
npm run dev  # (si agregaste el script)

# El servidor estará en: http://localhost:3001
```

## 📡 API Endpoints

### Base URL: `http://localhost:3001/api`

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/productos` | Listar productos | `categoria`, `tipo`, `color`, `q`, `page`, `limit` |
| `GET` | `/productos/:id` | Obtener producto | - |
| `POST` | `/productos` | Crear producto | Datos del producto en body |
| `PUT` | `/productos/:id` | Actualizar producto | Datos a actualizar en body |
| `DELETE` | `/productos/:id` | Eliminar producto | - |
| `GET` | `/health` | Estado del servidor | - |

### Ejemplos de Uso

```bash
# Listar todos los productos
curl http://localhost:3001/api/productos

# Filtrar por categoría
curl "http://localhost:3001/api/productos?categoria=Especialidad"

# Buscar productos
curl "http://localhost:3001/api/productos?q=fluor"

# Paginación
curl "http://localhost:3001/api/productos?page=1&limit=5"

# Crear producto
curl -X POST http://localhost:3001/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Producto Nuevo",
    "categoria": "Test",
    "tipo": "Ejemplo",
    "cantidad": 10,
    "precio_unidad": 15.99,
    "precio_bulto": 150.00,
    "descripcion": "Producto de prueba"
  }'
```

## 🖼️ Gestión de Imágenes

### Ubicación:
- **Almacenamiento**: `public/products/`
- **URL Acceso**: `http://localhost:3001/products/imagen.jpg`
- **Base de Datos**: Array JSON en campo `fotos`

### Imágenes Actuales:
- `fluor.jpg` - Producto fluorescente
- `transparente.jpg` - Producto transparente

### Agregar Nuevas Imágenes:
1. Copiar imagen a `public/products/`
2. Actualizar producto con ruta: `["/products/nueva-imagen.jpg"]`

## 🔧 Frontend Integration

### Servicio de Productos (`src/services/products.js`)

```javascript
import ProductService from '../services/products';

// Listar productos
const productos = await ProductService.list();

// Filtrar productos
const filtrados = await ProductService.list({ categoria: 'Especialidad' });

// Obtener producto específico
const producto = await ProductService.get(1);
```

### Página Products.js

- ✅ **Carga dinámica** desde API
- ✅ **Estados de carga** y error
- ✅ **Fallback** a datos de ejemplo si no hay conexión
- ✅ **Filtros** mantienen funcionalidad
- ✅ **Información adicional**: precios, stock, modelo
- ✅ **Indicador de conexión** API

## 🌍 Entornos

### Desarrollo (SQLite)
- **Base de datos**: `database.sqlite` (archivo local)
- **Configuración**: Automática si no hay `DATABASE_URL`
- **Ventajas**: Sin configuración, fácil de resetear

### Producción (PostgreSQL)
- **Base de datos**: PostgreSQL via `DATABASE_URL`
- **Configuración**: Variable de entorno
- **Migración**: Usar `001_create_productos.sql`

### Docker Compose (Opcional)

```yaml
version: '3.8'
services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: foslit_db
      POSTGRES_USER: foslit_user
      POSTGRES_PASSWORD: foslit_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📝 Scripts Recomendados

Agregar a `package.json`:

```json
{
  "scripts": {
    "backend:dev": "nodemon backend/server.js",
    "backend:start": "node backend/server.js",
    "db:migrate": "node backend/scripts/migrate.js",
    "db:seed": "node backend/scripts/seed.js",
    "db:reset": "npm run db:migrate && npm run db:seed",
    "dev:full": "concurrently \"npm run backend:dev\" \"npm start\""
  }
}
```

## 🧪 Testing de la API

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Verificar Productos
```bash
curl http://localhost:3001/api/productos | jq
```

### Verificar Imágenes
```bash
curl -I http://localhost:3001/products/fluor.jpg
```

## 🔒 Validaciones Implementadas

- ✅ **Campos requeridos**: nombre, categoria, tipo, cantidad, precios
- ✅ **Tipos de datos**: números para precios y cantidad
- ✅ **Rangos**: cantidad ≥ 0, precios ≥ 0
- ✅ **Formato**: fotos debe ser array de URLs
- ✅ **Longitud**: límites en campos de texto

## 🐛 Solución de Problemas

### "Error conectando a la base de datos"
- Verificar que el archivo `database.sqlite` se pueda crear
- Comprobar permisos de escritura en el directorio

### "API no disponible"
- Verificar que el servidor backend esté ejecutándose en puerto 3001
- Comprobar la variable `REACT_APP_API_URL` en el frontend

### "Imágenes no se cargan"
- Verificar que las imágenes estén en `public/products/`
- Comprobar rutas en el campo `fotos` de la base de datos

### "CORS error"
- Verificar configuración de CORS en `backend/server.js`
- Comprobar que `FRONTEND_URL` esté configurada correctamente

## ✅ Criterios de Aceptación Completados

- ✅ Migraciones y seeds ejecutan sin errores
- ✅ Tabla incluye columna `fotos` con JSON
- ✅ Catálogo muestra productos desde BD (sin mocks)
- ✅ Imágenes se renderizan desde `product.fotos[0]` con fallback
- ✅ Filtros del front funcionan con la API
- ✅ Validaciones evitan números negativos
- ✅ Documentación reproducible de punta a punta

## 🚀 Próximos Pasos Sugeridos

1. **Autenticación**: Agregar sistema de usuarios y login
2. **Admin Panel**: Interfaz para gestionar productos
3. **Carrito**: Sistema de compras
4. **Paginación**: Implementar en el frontend
5. **Búsqueda avanzada**: Filtros múltiples
6. **Upload de imágenes**: Endpoint para subir archivos
7. **Cache**: Redis para mejorar rendimiento
8. **Tests**: Unit tests y integration tests