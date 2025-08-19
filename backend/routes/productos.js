const express = require('express');
const ProductosController = require('../controllers/productosController');

const router = express.Router();

// GET /api/productos - Listar productos con filtros y paginación
router.get('/', ProductosController.index);

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', ProductosController.show);

// POST /api/productos - Crear nuevo producto
router.post('/', ProductosController.create);

// PUT /api/productos/:id - Actualizar producto
router.put('/:id', ProductosController.update);

// DELETE /api/productos/:id - Eliminar producto
router.delete('/:id', ProductosController.destroy);

module.exports = router;