#!/bin/bash

# Script de instalación rápida para la base de datos de FosLit WebPage
# Ejecutar desde la raíz del proyecto: chmod +x setup-database.sh && ./setup-database.sh

set -e  # Salir si cualquier comando falla

echo "🚀 Configurando base de datos para FosLit WebPage..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}📌 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    print_error "Este script debe ejecutarse desde la raíz del proyecto FosLit_WebPage"
    exit 1
fi

print_step "Instalando dependencias del backend..."
npm install express cors dotenv sqlite3 pg joi nodemon --save-dev

print_step "Creando archivo de configuración .env..."
if [ ! -f ".env" ]; then
cat > .env << EOF
# Configuración del servidor
PORT=3001
NODE_ENV=development

# URL del frontend (para CORS)
FRONTEND_URL=http://localhost:3000

# Base de datos PostgreSQL (para producción) - opcional
# DATABASE_URL=postgresql://usuario:password@localhost:5432/foslit_db
EOF
    print_success "Archivo .env creado"
else
    print_warning "Archivo .env ya existe, no se sobrescribió"
fi

print_step "Creando directorios necesarios..."
mkdir -p backend/{config,models,controllers,validators,routes,migrations,seeds,scripts}
mkdir -p public/products
mkdir -p src/services

print_success "Estructura de directorios creada"

print_step "Ejecutando migraciones..."
if [ -f "backend/scripts/migrate.js" ]; then
    node backend/scripts/migrate.js
    print_success "Migraciones ejecutadas"
else
    print_warning "Script de migración no encontrado, saltando..."
fi

print_step "Cargando datos de prueba..."
if [ -f "backend/scripts/seed.js" ]; then
    node backend/scripts/seed.js
    print_success "Seeds cargados"
else
    print_warning "Script de seed no encontrado, saltando..."
fi

print_step "Actualizando package.json con scripts útiles..."
# Crear un backup del package.json actual
cp package.json package.json.backup

# Agregar scripts usando node (más compatible que jq)
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = pkg.scripts || {};
Object.assign(pkg.scripts, {
  'backend:dev': 'nodemon backend/server.js',
  'backend:start': 'node backend/server.js',
  'db:migrate': 'node backend/scripts/migrate.js',
  'db:seed': 'node backend/scripts/seed.js',
  'db:reset': 'npm run db:migrate && npm run db:seed'
});
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

print_success "Scripts agregados a package.json"

print_step "Verificando instalación..."

# Verificar que los archivos críticos existen
critical_files=(
    "backend/server.js"
    "backend/config/database.js"
    "backend/models/Producto.js"
    "src/services/products.js"
)

all_files_exist=true
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file ✓"
    else
        print_error "$file ✗"
        all_files_exist=false
    fi
done

echo ""
if [ "$all_files_exist" = true ]; then
    print_success "¡Instalación completada exitosamente!"
    echo ""
    echo -e "${BLUE}🚀 Para iniciar el proyecto:${NC}"
    echo ""
    echo "1. Backend (en una terminal):"
    echo -e "   ${YELLOW}npm run backend:dev${NC}"
    echo ""
    echo "2. Frontend (en otra terminal):"
    echo -e "   ${YELLOW}npm start${NC}"
    echo ""
    echo -e "${BLUE}📡 URLs importantes:${NC}"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:3001/api"
    echo "   Health Check: http://localhost:3001/api/health"
    echo "   Productos: http://localhost:3001/api/productos"
    echo ""
    echo -e "${BLUE}📚 Documentación:${NC}"
    echo "   README_BASE_DATOS.md - Documentación completa"
    echo ""
else
    print_error "Algunos archivos críticos no se encontraron. Revisa la documentación para instalación manual."
    exit 1
fi