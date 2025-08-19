const database = require('../config/database');

const productosData = [
  {
    nombre: 'Producto Fluorescente Premium',
    categoria: 'Especialidad',
    tipo: 'Acabado Especial',
    cantidad: 25,
    modelo: 'FLUOR-001',
    color: 'Fluorescente',
    precio_unidad: 15.99,
    precio_bulto: 140.00,
    descripcion: 'Producto con acabado fluorescente de alta calidad. Ideal para aplicaciones que requieren visibilidad en condiciones de poca luz.',
    fotos: ['/products/fluor.jpg']
  },
  {
    nombre: 'Producto Transparente Cristalino',
    categoria: 'Especialidad', 
    tipo: 'Acabado Transparente',
    cantidad: 18,
    modelo: 'TRANS-001',
    color: 'Transparente',
    precio_unidad: 12.50,
    precio_bulto: 110.00,
    descripcion: 'Producto con acabado transparente cristalino. Perfecto para aplicaciones donde se requiere máxima claridad.',
    fotos: ['/products/transparente.jpg']
  },
  {
    nombre: 'Producto Estándar Blanco',
    categoria: 'Estándar',
    tipo: 'Acabado Mate',
    cantidad: 50,
    modelo: 'STD-001',
    color: 'Blanco',
    precio_unidad: 8.99,
    precio_bulto: 75.00,
    descripcion: 'Producto estándar con acabado mate blanco. Solución confiable para uso cotidiano.',
    fotos: []
  },
  {
    nombre: 'Producto Premium Negro',
    categoria: 'Premium',
    tipo: 'Acabado Brillante',
    cantidad: 12,
    modelo: 'PREM-001',
    color: 'Negro',
    precio_unidad: 22.99,
    precio_bulto: 200.00,
    descripcion: 'Producto premium con acabado brillante negro. Máxima calidad y durabilidad.',
    fotos: []
  },
  {
    nombre: 'Producto Económico Gris',
    categoria: 'Económico',
    tipo: 'Acabado Básico',
    cantidad: 75,
    modelo: 'ECO-001',
    color: 'Gris',
    precio_unidad: 5.99,
    precio_bulto: 45.00,
    descripcion: 'Producto económico con acabado básico gris. Calidad accesible sin comprometer la funcionalidad.',
    fotos: []
  },
  {
    nombre: 'Producto Natural Verde',
    categoria: 'Natural',
    tipo: 'Acabado Ecológico',
    cantidad: 30,
    modelo: 'NAT-001',
    color: 'Verde',
    precio_unidad: 18.50,
    precio_bulto: 160.00,
    descripcion: 'Producto con acabado ecológico verde. Fabricado con materiales sostenibles y procesos respetuosos con el medio ambiente.',
    fotos: []
  },
  {
    nombre: 'Producto Industrial Azul',
    categoria: 'Industrial',
    tipo: 'Acabado Resistente',
    cantidad: 40,
    modelo: 'IND-001',
    color: 'Azul',
    precio_unidad: 25.99,
    precio_bulto: 225.00,
    descripcion: 'Producto industrial con acabado resistente azul. Diseñado para aplicaciones de alta demanda y condiciones extremas.',
    fotos: []
  },
  {
    nombre: 'Producto Decorativo Dorado',
    categoria: 'Decorativo',
    tipo: 'Acabado Metálico',
    cantidad: 8,
    modelo: 'DEC-001',
    color: 'Dorado',
    precio_unidad: 35.99,
    precio_bulto: 300.00,
    descripcion: 'Producto decorativo con acabado metálico dorado. Perfecto para aplicaciones ornamentales y de alto valor estético.',
    fotos: []
  }
];

async function seedProductos() {
  try {
    await database.connect();
    
    console.log('Iniciando seed de productos...');
    
    for (const producto of productosData) {
      const fotosJson = database.isPostgres 
        ? JSON.stringify(producto.fotos)
        : JSON.stringify(producto.fotos);
        
      const sql = `
        INSERT INTO productos (
          nombre, categoria, tipo, cantidad, modelo, color, 
          precio_unidad, precio_bulto, descripcion, fotos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const params = [
        producto.nombre,
        producto.categoria,
        producto.tipo,
        producto.cantidad,
        producto.modelo,
        producto.color,
        producto.precio_unidad,
        producto.precio_bulto,
        producto.descripcion,
        fotosJson
      ];
      
      await database.query(sql, params);
      console.log(`✓ Producto creado: ${producto.nombre}`);
    }
    
    console.log('✅ Seed de productos completado exitosamente');
    
  } catch (error) {
    console.error('❌ Error en seed de productos:', error);
    throw error;
  } finally {
    await database.close();
  }
}

// Ejecutar seed si se llama directamente
if (require.main === module) {
  seedProductos().catch(console.error);
}

module.exports = { seedProductos, productosData };