# Guía para Agregar Imágenes de Productos

## Estructura Actual

Las imágenes de productos están organizadas de la siguiente manera:
- **Ubicación**: `src/assets/products/`
- **Gestión**: `src/utils/productImageHelper.js`
- **Uso**: `src/pages/Products.js`

## Cómo Agregar Nuevas Imágenes

### Paso 1: Agregar la imagen
1. Coloca tu nueva imagen en la carpeta `src/assets/products/`
2. Usa formatos compatibles: `.jpg`, `.jpeg`, `.png`, `.webp`
3. Nombres recomendados: descriptivos y sin espacios (ej: `producto-rojo.jpg`)

### Paso 2: Registrar la imagen
Edita el archivo `src/utils/productImageHelper.js`:

```javascript
// 1. Agregar la importación
import nuevaImg from '../assets/products/nueva-imagen.jpg';

// 2. Agregar al objeto productImages
export const productImages = {
  fluor: fluorImg,
  transparente: transparenteImg,
  nuevaImagen: nuevaImg, // ← Agregar aquí
};
```

### Paso 3: Usar en el catálogo
En `src/pages/Products.js`, agrega el producto al array `allProducts`:

```javascript
{
  id: 6, // Siguiente ID disponible
  name: 'Nombre del Producto',
  description: 'Descripción del producto',
  image: getProductImage('nuevaImagen'), // ← Usar la clave definida arriba
  category: 'Categoría',
  imageKey: 'nuevaImagen'
},
```

## Características del Sistema

✅ **Escalable**: Agregar nuevas imágenes es un proceso de 3 pasos
✅ **Seguro**: Fallback automático si una imagen no se carga
✅ **Optimizado**: Las imágenes se cargan a través del sistema de build de React
✅ **Mantenible**: Código organizado y documentado

## Categorías Actuales
- Especialidad
- Premium
- Estándar
- Económico

Puedes crear nuevas categorías simplemente agregándolas en los datos del producto.

## Solución de Problemas

### Error "Cannot resolve module"
- Verifica que la ruta del archivo sea correcta
- Asegúrate de que el archivo exista en `src/assets/products/`
- Verifica que la extensión del archivo coincida

### Imagen no se muestra
- El sistema automáticamente mostrará un placeholder
- Revisa la consola del navegador para errores
- Verifica que el `imageKey` en el producto coincida con la clave en `productImages`

### Optimización de Imágenes
Para mejor rendimiento:
- Usa imágenes optimizadas (máximo 500KB por imagen)
- Resolución recomendada: 300x200px o proporcional
- Formatos preferidos: `.webp` > `.jpg` > `.png`