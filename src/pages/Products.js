import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, ShoppingBag, Tag, Search } from 'lucide-react';

const Products = () => {
  // Datos de prueba para los productos
  const allProducts = [
    { id: 1, name: 'Gadget Supremo', description: 'Hace cosas que no sabías que necesitabas.', image: 'https://via.placeholder.com/300x200?text=Gadget+Supremo', category: 'Electrónica' },
    { id: 2, name: 'Dispositivo Mágico', description: 'Transforma tu vida (o al menos tu día).', image: 'https://via.placeholder.com/300x200?text=Dispositivo+Mágico', category: 'Hogar' },
    { id: 3, name: 'Cosa Increíble', description: 'No sabemos qué es, pero lo quieres.', image: 'https://via.placeholder.com/300x200?text=Cosa+Increíble', category: 'Novedades' },
    { id: 4, name: 'Artilugio Fantástico', description: 'Tu vida antes y después de este producto.', image: 'https://via.placeholder.com/300x200?text=Artilugio+Fantástico', category: 'Electrónica' },
    { id: 5, name: 'Maravilla Tecnológica', description: 'Tan avanzado que aún no lo entendemos.', image: 'https://via.placeholder.com/300x200?text=Maravilla+Tecnológica', category: 'Hogar' },
    { id: 6, name: 'Objeto Deseado', description: 'El sueño de todo coleccionista (o comprador compulsivo).', image: 'https://via.placeholder.com/300x200?text=Objeto+Deseado', category: 'Novedades' },
    { id: 7, name: 'Auriculares Inalámbricos', description: 'Sumérgete en tu música sin cables.', image: 'https://via.placeholder.com/300x200?text=Auriculares', category: 'Electrónica' },
    { id: 8, name: 'Lámpara de Ambiente', description: 'Crea la atmósfera perfecta para cualquier ocasión.', image: 'https://via.placeholder.com/300x200?text=Lámpara', category: 'Hogar' },
    { id: 9, name: 'Juego de Mesa Épico', description: 'Horas de diversión garantizadas (o frustración, depende de tus amigos).', image: 'https://via.placeholder.com/300x200?text=Juego+Mesa', category: 'Entretenimiento' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Todos', ...new Set(allProducts.map(product => product.category))];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-yellow-50 to-orange-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto text-center">
        <motion.h1
          className="text-5xl font-extrabold text-gray-900 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Nuestros Productos
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 mb-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Aquí es donde la magia sucede. Prepárate para desearlo todo.
        </motion.p>

        {/* Barra de Búsqueda */}
        <motion.div
          className="relative mb-10 max-w-xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-6 py-3 pl-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all duration-200 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        </motion.div>

        {/* Selector de Categorías */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tag className="w-5 h-5" />
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.8, duration: 0.5 }}
              whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500 flex items-center">
                    <Tag className="w-4 h-4 mr-1 text-blue-500" />
                    {product.category}
                  </span>
                </div>
                <motion.button
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Ver Detalles
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <motion.p
            className="text-2xl text-gray-500 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ¡Vaya! No encontramos productos que coincidan con tu búsqueda o categoría. ¿Estás seguro de que existe?
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Products;