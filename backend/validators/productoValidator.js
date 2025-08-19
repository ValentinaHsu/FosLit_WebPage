const Joi = require('joi');

const productoSchema = Joi.object({
  nombre: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'El nombre es requerido',
    'string.max': 'El nombre no puede exceder 255 caracteres'
  }),
  
  categoria: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'La categoría es requerida',
    'string.max': 'La categoría no puede exceder 100 caracteres'
  }),
  
  tipo: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'El tipo es requerido',
    'string.max': 'El tipo no puede exceder 100 caracteres'
  }),
  
  cantidad: Joi.number().integer().min(0).required().messages({
    'number.base': 'La cantidad debe ser un número',
    'number.integer': 'La cantidad debe ser un número entero',
    'number.min': 'La cantidad no puede ser negativa'
  }),
  
  modelo: Joi.string().max(100).allow('', null).messages({
    'string.max': 'El modelo no puede exceder 100 caracteres'
  }),
  
  color: Joi.string().max(50).allow('', null).messages({
    'string.max': 'El color no puede exceder 50 caracteres'
  }),
  
  precio_unidad: Joi.number().precision(2).min(0).required().messages({
    'number.base': 'El precio por unidad debe ser un número',
    'number.min': 'El precio por unidad no puede ser negativo'
  }),
  
  precio_bulto: Joi.number().precision(2).min(0).required().messages({
    'number.base': 'El precio por bulto debe ser un número',
    'number.min': 'El precio por bulto no puede ser negativo'
  }),
  
  descripcion: Joi.string().allow('', null).messages({
    'string.base': 'La descripción debe ser texto'
  }),
  
  fotos: Joi.array().items(
    Joi.string().uri({ allowRelative: true }).messages({
      'string.uri': 'Cada foto debe ser una URL válida'
    })
  ).default([]).messages({
    'array.base': 'Las fotos deben ser un array de URLs'
  })
});

const updateProductoSchema = productoSchema.fork(
  ['nombre', 'categoria', 'tipo', 'cantidad', 'precio_unidad', 'precio_bulto'], 
  (schema) => schema.optional()
);

const validateProducto = (data) => {
  return productoSchema.validate(data, { abortEarly: false });
};

const validateUpdateProducto = (data) => {
  return updateProductoSchema.validate(data, { abortEarly: false });
};

const validateFilters = (data) => {
  const filterSchema = Joi.object({
    categoria: Joi.string().max(100),
    tipo: Joi.string().max(100),
    color: Joi.string().max(50),
    q: Joi.string().max(255),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  });
  
  return filterSchema.validate(data, { allowUnknown: false });
};

module.exports = {
  validateProducto,
  validateUpdateProducto,
  validateFilters
};