import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Info, Building2, Package } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Sobre Nosotros', path: '/about', icon: Info },
    { name: 'Empresa', path: '/company', icon: Building2 },
    { name: 'Productos', path: '/products', icon: Package },
  ];

  return (
    <motion.nav
      className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold tracking-wider">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            CatálogoWeb
          </motion.span>
        </Link>
        <div className="flex space-x-6">
          {navItems.map((item, index) => (
            <Link key={item.name} to={item.path}>
              <motion.div
                className="flex items-center text-white hover:text-blue-200 transition-colors duration-300 group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform" />
                <span className="font-medium text-lg">{item.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;