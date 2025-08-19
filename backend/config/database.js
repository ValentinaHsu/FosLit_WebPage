const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');
require('dotenv').config();

class Database {
  constructor() {
    this.db = null;
    this.isPostgres = process.env.NODE_ENV === 'production' && process.env.DATABASE_URL;
  }

  async connect() {
    if (this.isPostgres) {
      // PostgreSQL para producción
      this.db = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      });
      console.log('Conectado a PostgreSQL');
    } else {
      // SQLite para desarrollo
      return new Promise((resolve, reject) => {
        this.db = new sqlite3.Database('database.sqlite', (err) => {
          if (err) {
            console.error('Error conectando a SQLite:', err.message);
            reject(err);
          } else {
            console.log('Conectado a SQLite');
            resolve();
          }
        });
      });
    }
  }

  async query(sql, params = []) {
    if (this.isPostgres) {
      try {
        const result = await this.db.query(sql, params);
        return result.rows;
      } catch (error) {
        console.error('Error en query PostgreSQL:', error);
        throw error;
      }
    } else {
      // SQLite
      return new Promise((resolve, reject) => {
        if (sql.trim().toUpperCase().startsWith('SELECT')) {
          this.db.all(sql, params, (err, rows) => {
            if (err) {
              console.error('Error en query SQLite:', err);
              reject(err);
            } else {
              resolve(rows);
            }
          });
        } else {
          this.db.run(sql, params, function(err) {
            if (err) {
              console.error('Error en query SQLite:', err);
              reject(err);
            } else {
              resolve({ 
                insertId: this.lastID, 
                changes: this.changes,
                rows: [] 
              });
            }
          });
        }
      });
    }
  }

  async close() {
    if (this.isPostgres) {
      await this.db.end();
    } else {
      return new Promise((resolve) => {
        this.db.close((err) => {
          if (err) {
            console.error('Error cerrando SQLite:', err.message);
          }
          resolve();
        });
      });
    }
  }
}

module.exports = new Database();