const Producto = require('../models/Producto');
const { validateProducto, validateUpdateProducto, validateFilters } = require('../validators/productoValidator');

class ProductosController {
  
  // GET /api/productos
  static async index(req, res) {
    try {
      // Validar filtros y paginación
      const { error, value } = validateFilters(req.query);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Parámetros de consulta inválidos',
          errors: error.details.map(detail => detail.message)
        });
      }

      const { categoria, tipo, color, q, page, limit } = value;
      
      // Obtener productos con filtros
      const filters = { categoria, tipo, color, q };
      const pagination = { page, limit };
      
      const [productos, total] = await Promise.all([
        Producto.findAll(filters, pagination),
        Producto.count(filters)
      ]);

      // Calcular metadatos de paginación
      const totalPages = Math.ceil(total / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      res.json({
        success: true,
        data: productos,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage,
          hasPrevPage
        },
        filters: {
          categoria: categoria || null,
          tipo: tipo || null,
          color: color || null,
          search: q || null
        }
      });

    } catch (error) {
      console.error('Error en ProductosController.index:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // GET /api/productos/:id
  static async show(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido'
        });
      }

      const producto = await Producto.findById(parseInt(id));
      
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        data: producto
      });

    } catch (error) {
      console.error('Error en ProductosController.show:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // POST /api/productos
  static async create(req, res) {
    try {
      // Validar datos de entrada
      const { error, value } = validateProducto(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos de producto inválidos',
          errors: error.details.map(detail => detail.message)
        });
      }

      const producto = await Producto.create(value);

      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: producto
      });

    } catch (error) {
      console.error('Error en ProductosController.create:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // PUT /api/productos/:id
  static async update(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido'
        });
      }

      // Verificar que el producto existe
      const productoExistente = await Producto.findById(parseInt(id));
      if (!productoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      // Validar datos de actualización
      const { error, value } = validateUpdateProducto(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos de actualización inválidos',
          errors: error.details.map(detail => detail.message)
        });
      }

      const productoActualizado = await Producto.update(parseInt(id), value);

      res.json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: productoActualizado
      });

    } catch (error) {
      console.error('Error en ProductosController.update:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // DELETE /api/productos/:id
  static async destroy(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido'
        });
      }

      // Verificar que el producto existe
      const productoExistente = await Producto.findById(parseInt(id));
      if (!productoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      const eliminado = await Producto.delete(parseInt(id));
      
      if (eliminado) {
        res.json({
          success: true,
          message: 'Producto eliminado exitosamente'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'No se pudo eliminar el producto'
        });
      }

    } catch (error) {
      console.error('Error en ProductosController.destroy:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = ProductosController;