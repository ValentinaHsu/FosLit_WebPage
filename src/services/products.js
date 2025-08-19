// Servicio para manejar las operaciones con productos desde la API

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ProductService {
  
  // Obtener lista de productos con filtros y paginación
  static async list(filters = {}, pagination = {}) {
    try {
      const params = new URLSearchParams();
      
      // Agregar filtros
      if (filters.categoria) params.append('categoria', filters.categoria);
      if (filters.tipo) params.append('tipo', filters.tipo);
      if (filters.color) params.append('color', filters.color);
      if (filters.q) params.append('q', filters.q);
      
      // Agregar paginación
      if (pagination.page) params.append('page', pagination.page);
      if (pagination.limit) params.append('limit', pagination.limit);
      
      const url = `${API_BASE_URL}/productos${params.toString() ? `?${params.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Error al obtener productos');
      }
      
      return data;
      
    } catch (error) {
      console.error('Error en ProductService.list:', error);
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }
  
  // Obtener un producto por ID
  static async get(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Producto no encontrado');
        }
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Error al obtener producto');
      }
      
      return data.data;
      
    } catch (error) {
      console.error('Error en ProductService.get:', error);
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }
  
  // Crear un nuevo producto
  static async create(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Error HTTP: ${response.status}`);
      }
      
      if (!data.success) {
        throw new Error(data.message || 'Error al crear producto');
      }
      
      return data.data;
      
    } catch (error) {
      console.error('Error en ProductService.create:', error);
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }
  
  // Actualizar un producto existente
  static async update(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Producto no encontrado');
        }
        throw new Error(data.message || `Error HTTP: ${response.status}`);
      }
      
      if (!data.success) {
        throw new Error(data.message || 'Error al actualizar producto');
      }
      
      return data.data;
      
    } catch (error) {
      console.error('Error en ProductService.update:', error);
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }
  
  // Eliminar un producto
  static async remove(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Producto no encontrado');
        }
        throw new Error(data.message || `Error HTTP: ${response.status}`);
      }
      
      if (!data.success) {
        throw new Error(data.message || 'Error al eliminar producto');
      }
      
      return true;
      
    } catch (error) {
      console.error('Error en ProductService.remove:', error);
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }
  
  // Verificar conectividad con la API
  static async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data.success;
      
    } catch (error) {
      console.error('Error en ProductService.healthCheck:', error);
      return false;
    }
  }
  
  // Obtener todas las categorías disponibles
  static async getCategories() {
    try {
      const response = await this.list({}, { limit: 1000 });
      const categorias = [...new Set(response.data.map(product => product.categoria))];
      return categorias.filter(cat => cat).sort();
    } catch (error) {
      console.error('Error obteniendo categorías:', error);
      return [];
    }
  }
  
  // Obtener todos los tipos disponibles
  static async getTypes() {
    try {
      const response = await this.list({}, { limit: 1000 });
      const tipos = [...new Set(response.data.map(product => product.tipo))];
      return tipos.filter(tipo => tipo).sort();
    } catch (error) {
      console.error('Error obteniendo tipos:', error);
      return [];
    }
  }
  
  // Obtener todos los colores disponibles
  static async getColors() {
    try {
      const response = await this.list({}, { limit: 1000 });
      const colores = [...new Set(response.data.map(product => product.color))];
      return colores.filter(color => color).sort();
    } catch (error) {
      console.error('Error obteniendo colores:', error);
      return [];
    }
  }
}

export default ProductService;