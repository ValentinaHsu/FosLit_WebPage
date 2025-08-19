import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, ShoppingBag, Tag, Search, Loader2, AlertCircle } from 'lucide-react';
import ProductService from '../services/products';

const Products = () => {
  // Estados para datos y UI
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['Todos']);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiConnected, setApiConnected] = useState(false);

  // Función para cargar productos desde la API
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar conectividad
      const isConnected = await ProductService.healthCheck();
      setApiConnected(isConnected);
      
      if (!isConnected) {
        throw new Error('No se puede conectar con la API del servidor');
      }
      
      // Obtener productos
      const response = await ProductService.list({}, { limit: 100 });
      const productos = response.data;
      
      // Transformar datos para compatibilidad con el componente actual
      const productosTransformados = productos.map(producto => ({
        id: producto.id,
        name: producto.nombre,
        description: producto.descripcion,
        category: producto.categoria,
        tipo: producto.tipo,
        color: producto.color,
        precio_unidad: producto.precio_unidad,
        precio_bulto: producto.precio_bulto,
        cantidad: producto.cantidad,
        modelo: producto.modelo,
        image: producto.fotos?.[0] 
          ? `http://localhost:3001${producto.fotos[0]}`
          : 'https://via.placeholder.com/300x200?text=Sin+Imagen',
        fotos: producto.fotos || []
      }));
      
      setAllProducts(productosTransformados);
      
      // Extraer categorías únicas
      const categoriasUnicas = ['Todos', ...new Set(productosTransformados.map(p => p.category))];
      setCategories(categoriasUnicas);
      
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError(error.message);
      setApiConnected(false);
      
      // Fallback a datos de ejemplo si no hay conexión
      const fallbackProducts = [
        { 
          id: 1, 
          name: 'Producto Ejemplo', 
          description: 'Datos de ejemplo - API no disponible', 
          category: 'Ejemplo',
          image: 'https://via.placeholder.com/300x200?text=API+No+Disponible'
        }
      ];
      setAllProducts(fallbackProducts);
      setCategories(['Todos', 'Ejemplo']);
      
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  // Filtrar productos basado en categoría y búsqueda
  useEffect(() => {
    const filtered = allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
    setFilteredProducts(filtered);
  }, [allProducts, selectedCategory, searchTerm]);

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] bg-white p-8"
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

        {/* Indicador de Estado de la API */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className={`flex items-center px-4 py-2 rounded-full text-sm ${
            apiConnected 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              apiConnected ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            {apiConnected ? 'Conectado a la base de datos' : 'Usando datos de ejemplo'}
          </div>
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

        {/* Estado de Carga */}
        {loading && (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
            <p className="text-xl text-gray-600">Cargando productos...</p>
          </motion.div>
        )}

        {/* Estado de Error */}
        {error && !loading && (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-xl text-gray-600 mb-4">Error cargando productos</p>
            <p className="text-gray-500 mb-6">{error}</p>
            <motion.button
              onClick={loadProducts}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reintentar
            </motion.button>
          </motion.div>
        )}

        {/* Grid de Productos */}
        {!loading && !error && (
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
                onError={(e) => {
                  e.target.onerror = null; // Prevenir loop infinito
                  e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+No+Disponible';
                }}
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                {/* Información adicional del producto */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                      <Tag className="w-4 h-4 mr-1 text-blue-500" />
                      {product.category}
                    </span>
                    {product.color && (
                      <span className="text-sm text-gray-500">
                        Color: {product.color}
                      </span>
                    )}
                  </div>
                  
                  {apiConnected && (
                    <>
                      {product.modelo && (
                        <div className="text-sm text-gray-500">
                          Modelo: {product.modelo}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">
                          ${product.precio_unidad}
                        </span>
                        <span className="text-sm text-gray-500">
                          Stock: {product.cantidad}
                        </span>
                      </div>
                      
                      {product.precio_bulto && product.precio_bulto !== product.precio_unidad && (
                        <div className="text-sm text-orange-600">
                          Precio por bulto: ${product.precio_bulto}
                        </div>
                      )}
                    </>
                  )}
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
        )}

        {/* Mensaje cuando no hay productos */}
        {!loading && !error && filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-2xl text-gray-500 mb-2">
              ¡Vaya! No encontramos productos que coincidan con tu búsqueda.
            </p>
            <p className="text-gray-400">
              Intenta con otros términos de búsqueda o categoría diferente.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Products;