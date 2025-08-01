// Archivo auxiliar para gestionar logos de manera escalable

// Importaciones de logos
import logoImg from '../assets/logo/LOGO.jpeg';

// Mapa de logos disponibles
export const logos = {
  main: logoImg,
  // Agregar más logos aquí cuando los tengas:
  // dark: darkLogoImg,
  // light: lightLogoImg,
};

// Función para obtener logo por clave, con fallback
export const getLogo = (logoKey = 'main') => {
  return logos[logoKey] || logos.main;
};

// Función para obtener todas las claves de logos disponibles
export const getAvailableLogoKeys = () => {
  return Object.keys(logos);
};