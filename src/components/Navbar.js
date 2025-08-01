import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Info, Building2, Package, Palette } from 'lucide-react';
import { getLogo } from '../utils/logoHelper';

const Navbar = () => {
  // Opciones de colores para la barra de navegación
  const colorSchemes = {
    default: "bg-gradient-to-r from-blue-600 to-purple-700",
    modern: "bg-gradient-to-r from-slate-900 to-slate-700", 
    warm: "bg-gradient-to-r from-orange-500 to-red-600",
    cool: "bg-gradient-to-r from-cyan-500 to-blue-600",
    elegant: "bg-gradient-to-r from-gray-800 to-gray-900",
    vibrant: "bg-gradient-to-r from-pink-500 to-violet-600",
    nature: "bg-gradient-to-r from-green-500 to-teal-600",
    sunset: "bg-gradient-to-r from-yellow-500 to-orange-600",
    ocean: "bg-gradient-to-r from-blue-500 to-cyan-400",
    minimal: "bg-white border-b-2 border-gray-200",
  };

  // Cambia esta variable para probar diferentes colores
  const [currentScheme, setCurrentScheme] = useState('default');
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Sobre Nosotros', path: '/about', icon: Info },
    { name: 'Empresa', path: '/company', icon: Building2 },
    { name: 'Productos', path: '/products', icon: Package },
  ];

  // Determinar el color del texto basado en el esquema
  const isMinimalScheme = currentScheme === 'minimal';
  const textColor = isMinimalScheme ? 'text-gray-800' : 'text-white';
  const hoverColor = isMinimalScheme ? 'hover:text-blue-600' : 'hover:text-blue-200';

  return (
    <motion.nav
      className={`${colorSchemes[currentScheme]} p-4 shadow-lg`}
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
          <motion.span
            className={`${textColor} text-2xl font-bold tracking-wider hidden sm:block`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            CatálogoWeb
          </motion.span>
        </Link>
        <div className="flex items-center space-x-6">
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

          {/* Color Scheme Selector (temporal para testing) */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <select
              value={currentScheme}
              onChange={(e) => setCurrentScheme(e.target.value)}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="default">Azul-Púrpura</option>
              <option value="modern">Moderno</option>
              <option value="warm">Cálido</option>
              <option value="cool">Fresco</option>
              <option value="elegant">Elegante</option>
              <option value="vibrant">Vibrante</option>
              <option value="nature">Natural</option>
              <option value="sunset">Atardecer</option>
              <option value="ocean">Océano</option>
              <option value="minimal">Minimalista</option>
            </select>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;