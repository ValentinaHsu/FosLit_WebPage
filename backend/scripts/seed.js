const { seedProductos } = require('../seeds/001_productos_seed');

async function runSeeds() {
  try {
    console.log('Ejecutando seeds...');
    await seedProductos();
    console.log('✅ Todos los seeds ejecutados exitosamente');
  } catch (error) {
    console.error('❌ Error ejecutando seeds:', error);
    process.exit(1);
  }
}

// Ejecutar seeds si se llama directamente
if (require.main === module) {
  runSeeds();
}

module.exports = { runSeeds };