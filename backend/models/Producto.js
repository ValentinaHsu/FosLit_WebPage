const database = require('../config/database');

class Producto {
  static async findAll(filters = {}, pagination = {}) {
    try {
      let sql = 'SELECT * FROM productos WHERE 1=1';
      const params = [];
      let paramIndex = 1;

      // Aplicar filtros
      if (filters.categoria) {
        sql += ` AND categoria = ?`;
        params.push(filters.categoria);
      }

      if (filters.tipo) {
        sql += ` AND tipo = ?`;
        params.push(filters.tipo);
      }

      if (filters.color) {
        sql += ` AND color = ?`;
        params.push(filters.color);
      }

      if (filters.q) {
        sql += ` AND (nombre LIKE ? OR descripcion LIKE ?)`;
        const searchTerm = `%${filters.q}%`;
        params.push(searchTerm, searchTerm);
      }

      // Ordenamiento
      sql += ' ORDER BY created_at DESC';

      // Paginación
      if (pagination.limit) {
        const limit = parseInt(pagination.limit) || 10;
        const offset = (parseInt(pagination.page) - 1 || 0) * limit;
        
        sql += ` LIMIT ? OFFSET ?`;
        params.push(limit, offset);
      }

      const productos = await database.query(sql, params);
      
      // Parsear fotos JSON para cada producto
      return productos.map(producto => ({
        ...producto,
        fotos: typeof producto.fotos === 'string' 
          ? JSON.parse(producto.fotos || '[]')
          : producto.fotos || []
      }));
      
    } catch (error) {
      console.error('Error en Producto.findAll:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const sql = 'SELECT * FROM productos WHERE id = ?';
      const productos = await database.query(sql, [id]);
      
      if (productos.length === 0) {
        return null;
      }
      
      const producto = productos[0];
      return {
        ...producto,
        fotos: typeof producto.fotos === 'string' 
          ? JSON.parse(producto.fotos || '[]')
          : producto.fotos || []
      };
      
    } catch (error) {
      console.error('Error en Producto.findById:', error);
      throw error;
    }
  }

  static async create(productoData) {
    try {
      const {
        nombre, categoria, tipo, cantidad, modelo, color,
        precio_unidad, precio_bulto, descripcion, fotos
      } = productoData;

      const fotosJson = JSON.stringify(fotos || []);

      const sql = `
        INSERT INTO productos (
          nombre, categoria, tipo, cantidad, modelo, color,
          precio_unidad, precio_bulto, descripcion, fotos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        nombre, categoria, tipo, cantidad, modelo, color,
        precio_unidad, precio_bulto, descripcion, fotosJson
      ];

      const result = await database.query(sql, params);
      
      // Obtener el ID del producto creado
      const newId = result.insertId || result.rows?.[0]?.id;
      
      if (newId) {
        return await this.findById(newId);
      }
      
      throw new Error('No se pudo obtener el ID del producto creado');
      
    } catch (error) {
      console.error('Error en Producto.create:', error);
      throw error;
    }
  }

  static async update(id, productoData) {
    try {
      const campos = [];
      const params = [];

      // Construir dinámicamente la query UPDATE
      Object.keys(productoData).forEach(key => {
        if (productoData[key] !== undefined) {
          if (key === 'fotos') {
            campos.push(`${key} = ?`);
            params.push(JSON.stringify(productoData[key] || []));
          } else {
            campos.push(`${key} = ?`);
            params.push(productoData[key]);
          }
        }
      });

      if (campos.length === 0) {
        throw new Error('No hay campos para actualizar');
      }

      // Agregar updated_at
      campos.push('updated_at = CURRENT_TIMESTAMP');
      params.push(id);

      const sql = `UPDATE productos SET ${campos.join(', ')} WHERE id = ?`;
      
      await database.query(sql, params);
      
      return await this.findById(id);
      
    } catch (error) {
      console.error('Error en Producto.update:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const sql = 'DELETE FROM productos WHERE id = ?';
      const result = await database.query(sql, [id]);
      
      return result.changes > 0 || result.rowCount > 0;
      
    } catch (error) {
      console.error('Error en Producto.delete:', error);
      throw error;
    }
  }

  static async count(filters = {}) {
    try {
      let sql = 'SELECT COUNT(*) as total FROM productos WHERE 1=1';
      const params = [];

      // Aplicar los mismos filtros que en findAll
      if (filters.categoria) {
        sql += ` AND categoria = ?`;
        params.push(filters.categoria);
      }

      if (filters.tipo) {
        sql += ` AND tipo = ?`;
        params.push(filters.tipo);
      }

      if (filters.color) {
        sql += ` AND color = ?`;
        params.push(filters.color);
      }

      if (filters.q) {
        sql += ` AND (nombre LIKE ? OR descripcion LIKE ?)`;
        const searchTerm = `%${filters.q}%`;
        params.push(searchTerm, searchTerm);
      }

      const result = await database.query(sql, params);
      return result[0].total;
      
    } catch (error) {
      console.error('Error en Producto.count:', error);
      throw error;
    }
  }
}

module.exports = Producto;