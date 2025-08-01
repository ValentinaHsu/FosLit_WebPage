import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Info, Building2, Package } from 'lucide-react';
import { getLogo } from '../utils/logoHelper';

const NavbarFinal = () => {
  // 🎨 CAMBIA AQUÍ EL COLOR DE FONDO - Opciones disponibles:
  const colorOptions = {
    default: "bg-gradient-to-r from-blue-600 to-purple-700",     // Azul-Púrpura (actual)
    modern: "bg-gradient-to-r from-slate-900 to-slate-700",     // Moderno (gris oscuro)
    warm: "bg-gradient-to-r from-orange-500 to-red-600",        // Cálido (naranja-rojo)
    cool: "bg-gradient-to-r from-cyan-500 to-blue-600",         // Fresco (cian-azul)
    elegant: "bg-gradient-to-r from-gray-800 to-gray-900",      // Elegante (gris)
    vibrant: "bg-gradient-to-r from-pink-500 to-violet-600",    // Vibrante (rosa-violeta)
    nature: "bg-gradient-to-r from-green-500 to-teal-600",      // Natural (verde)
    sunset: "bg-gradient-to-r from-yellow-500 to-orange-600",   // Atardecer (amarillo-naranja)
    ocean: "bg-gradient-to-r from-blue-500 to-cyan-400",        // Océano (azul-cian)
    minimal: "bg-white border-b-2 border-gray-200",             // Minimalista (blanco)
  };

  // 👆 CAMBIA 'default' por cualquier otra opción de arriba
  const selectedColor = colorOptions.minimal;
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Sobre Nosotros', path: '/about', icon: Info },
    { name: 'Empresa', path: '/company', icon: Building2 },
    { name: 'Productos', path: '/products', icon: Package },
  ];

  // Determinar colores del texto basado en el fondo
  const isMinimalScheme = selectedColor.includes('bg-white');
  const textColor = isMinimalScheme ? 'text-gray-800' : 'text-white';
  const hoverColor = isMinimalScheme ? 'hover:text-blue-600' : 'hover:text-blue-200';

  return (
    <motion.nav
      className={`${selectedColor} p-4 shadow-lg`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <motion.img
            src={getLogo()}
            alt="Logo"
            className="h-12 w-auto object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          />
          
        </Link>

        {/* Navigation Items */}
        <div className="flex space-x-6">
          {navItems.map((item, index) => (
            <Link key={item.name} to={item.path}>
              <motion.div
                className={`flex items-center ${textColor} ${hoverColor} transition-colors duration-300 group`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform" />
                <span className="font-medium text-lg hidden md:block">{item.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavbarFinal;