const fs = require('fs');
const path = require('path');
const database = require('../config/database');

async function runMigrations() {
  try {
    await database.connect();
    
    console.log('Ejecutando migraciones...');
    
    // Determinar qué archivo de migración usar
    const migrationFile = database.isPostgres 
      ? '001_create_productos.sql'
      : '001_create_productos_sqlite.sql';
    
    const migrationPath = path.join(__dirname, '../migrations', migrationFile);
    
    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Archivo de migración no encontrado: ${migrationPath}`);
    }
    
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Para PostgreSQL, ejecutar como una transacción
    if (database.isPostgres) {
      await database.query('BEGIN');
      try {
        // Dividir por declaraciones y ejecutar una por una
        const statements = migrationSQL
          .split(';')
          .filter(stmt => stmt.trim().length > 0)
          .map(stmt => stmt.trim() + ';');
        
        for (const statement of statements) {
          if (statement.trim() && !statement.startsWith('--')) {
            await database.query(statement);
          }
        }
        
        await database.query('COMMIT');
        console.log('✅ Migraciones PostgreSQL ejecutadas exitosamente');
      } catch (error) {
        await database.query('ROLLBACK');
        throw error;
      }
    } else {
      // Para SQLite, ejecutar las declaraciones una por una
      const statements = migrationSQL
        .split(';')
        .filter(stmt => stmt.trim().length > 0);
      
      for (const statement of statements) {
        if (statement.trim() && !statement.startsWith('--')) {
          await database.query(statement.trim());
        }
      }
      
      console.log('✅ Migraciones SQLite ejecutadas exitosamente');
    }
    
  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error);
    throw error;
  } finally {
    await database.close();
  }
}

// Ejecutar migraciones si se llama directamente
if (require.main === module) {
  runMigrations().catch(console.error);
}

module.exports = { runMigrations };