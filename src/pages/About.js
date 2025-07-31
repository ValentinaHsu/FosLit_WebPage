import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Award, Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario, por ahora solo lo mostramos en consola
    console.log('Formulario enviado:', formData);
    alert('¡Mensaje enviado! Te contactaremos... o no, depende de lo interesante que sea tu mensaje.');
    setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-teal-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center max-w-4xl mb-12">
        <motion.h1
          className="text-5xl font-extrabold text-gray-900 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Sobre Nosotros
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 mb-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Somos un equipo de genios (modestia aparte) dedicados a hacer que tu presencia online sea tan impresionante como tú.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl border border-green-200/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          >
            <Users className="w-16 h-16 text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Nuestro Equipo</h3>
            <p className="text-gray-500">Un grupo de nerds apasionados por el código y el diseño. Sí, somos así de cool.</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl border border-teal-200/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          >
            <Lightbulb className="w-16 h-16 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Nuestra Visión</h3>
            <p className="text-gray-500">Crear soluciones web tan buenas que te harán llorar de alegría (o de lo bien que funcionan).</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl border border-cyan-200/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            whileHover={{ translateY: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          >
            <Award className="w-16 h-16 text-purple-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Nuestros Valores</h3>
            <p className="text-gray-500">Excelencia, innovación y un sentido del humor cuestionable. ¡Lo tenemos todo!</p>
          </motion.div>
        </div>
      </div>

      {/* Sección de Contacto */}
      <motion.div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 border border-gray-200/50 mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Contáctanos</h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          ¿Tienes preguntas, sugerencias o simplemente quieres decir "hola"? ¡Estamos aquí para escucharte!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Tu nombre completo"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              placeholder="tu.email@ejemplo.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Mensaje:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Escribe tu mensaje aquí..."
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            Enviar Mensaje
          </motion.button>
        </form>

        <div className="mt-10 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">O encuéntranos en:</h3>
          <div className="flex justify-center space-x-8">
            <motion.a
              href="mailto:info@catalogoweb.com"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-6 h-6 mr-2" />
              info@catalogoweb.com
            </motion.a>
            <motion.a
              href="tel:+123456789"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Phone className="w-6 h-6 mr-2" />
              +1 (234) 567-890
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Sección del Mapa */}
      <motion.div
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 border border-gray-200/50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Nuestra Ubicación</h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Ven a visitarnos, si te atreves a encontrar nuestra guarida secreta.
        </p>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2999999999996!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858086a6b0d1b1%3A0x4d5b2d0c8e1a2b3c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de la empresa"
          ></iframe>
        </div>
        <p className="text-center text-gray-500 mt-4">
          *Ubicación de ejemplo: Puente Golden Gate. Porque somos así de ambiciosos.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;