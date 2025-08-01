// Archivo auxiliar para gestionar imágenes de productos de manera escalable

// Importaciones de imágenes existentes
import fluorImg from '../assets/products/fluor.jpg';
import transparenteImg from '../assets/products/transparente.jpg';

// Mapa de imágenes de productos
export const productImages = {
  fluor: fluorImg,
  transparente: transparenteImg,
  // Agregar nuevas imágenes aquí siguiendo el patrón:
  // nombreImagen: require('../assets/products/nombreArchivo.jpg').default,
};

// Función para obtener imagen por clave, con fallback
export const getProductImage = (imageKey) => {
  return productImages[imageKey] || 'https://via.placeholder.com/300x200?text=Imagen+No+Disponible';
};

// Función para obtener todas las claves de imágenes disponibles
export const getAvailableImageKeys = () => {
  return Object.keys(productImages);
};

// Guía de uso:
// 1. Coloca nuevas imágenes en src/assets/products/
// 2. Importa la imagen arriba
// 3. Agrega la entrada en el objeto productImages
// 4. Usa la clave en tus datos de productos

/* Ejemplo de cómo agregar una nueva imagen:
1. Agregar import: import nuevaImg from '../assets/products/nueva.jpg';
2. Agregar al objeto: nueva: nuevaImg,
3. Usar en productos: { ..., image: getProductImage('nueva'), imageKey: 'nueva' }
*/