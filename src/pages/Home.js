import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const images = [
    'https://via.placeholder.com/1200x400?text=Tu+Producto+Estrella+1',
    'https://via.placeholder.com/1200x400?text=Tu+Producto+Estrella+2',
    'https://via.placeholder.com/1200x400?text=Tu+Producto+Estrella+3',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Cambia la imagen cada 3 segundos
    return () => clearInterval(interval);
  }, [currentIndex]); // Se reinicia el intervalo cada vez que currentIndex cambia

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center max-w-6xl mx-auto">
        <motion.h1
          className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 100 }}
        >
          Bienvenido al catalogo de <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-black">FOSLit</span>
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mb-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Donde tus productos brillan con luz propia y tus clientes se enamoran a primera vista. ¡O al menos eso esperamos!
        </motion.p>

        {/* Carrusel de Imágenes */}
        <motion.div
          className="relative w-full h-96 overflow-hidden rounded-2xl shadow-2xl mb-16"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="absolute top-0 left-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <motion.button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white/80 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white/80 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        <div className="flex justify-center space-x-8">
          <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl border border-blue-200/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          >
            <Sparkles className="w-16 h-16 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Diseño Moderno</h3>
            <p className="text-gray-500">Para que tus productos se vean tan bien como en la vida real (o mejor).</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl border border-purple-200/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          >
            <Rocket className="w-16 h-16 text-red-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Rápido y Eficiente</h3>
            <p className="text-gray-500">Porque nadie tiene tiempo para esperar que cargue una página.</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl border border-indigo-200/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          >
            <LayoutDashboard className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Fácil de Usar</h3>
            <p className="text-gray-500">Tan fácil que hasta tu abuela podría navegarlo (si tuviera internet).</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;