import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Globe, Handshake } from 'lucide-react';

const Company = () => {
  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center max-w-4xl">
        <motion.h1
          className="text-5xl font-extrabold text-gray-900 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Nuestra Empresa
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 mb-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Somos la empresa que te hará decir: "¡Guau, esto es mucho mejor de lo que esperaba!". Y sí, nos gusta la exageración.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl border border-purple-200/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          >
            <Briefcase className="w-16 h-16 text-indigo-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Historia</h3>
            <p className="text-gray-500">Empezamos en un garaje, como todos los grandes. Ahora tenemos una oficina... con más garajes.</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl border border-pink-200/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          >
            <Globe className="w-16 h-16 text-orange-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Alcance Global</h3>
            <p className="text-gray-500">Con clientes en todo el mundo. Sí, incluso en ese país que no sabes dónde está.</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl border border-red-200/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          >
            <Handshake className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Asociaciones</h3>
            <p className="text-gray-500">Trabajamos con los mejores. Y si no lo son, los hacemos mejores. Así de simples somos.</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Company;