import pool from './config/database.js';

const runMigrations = async () => {
  try {
    console.log('🔄 Ejecutando migraciones...');

    // Agregar columna de último día si no existe
    await pool.query(`
      ALTER TABLE usuarios
      ADD COLUMN IF NOT EXISTS ultimo_dia_sobre DATE DEFAULT NULL;
    `);

    // Eliminar columna antigua de último_sobre_abierto si existe
    await pool.query(`
      ALTER TABLE usuarios
      DROP COLUMN IF EXISTS ultimo_sobre_abierto;
    `);

    // Asegurar que sobres_disponibles existe
    await pool.query(`
      ALTER TABLE usuarios
      ADD COLUMN IF NOT EXISTS sobres_disponibles INTEGER DEFAULT 2;
    `);

    // Setear valor inicial para usuarios existentes
    await pool.query(`
      UPDATE usuarios 
      SET sobres_disponibles = COALESCE(sobres_disponibles, 2)
      WHERE sobres_disponibles IS NULL;
    `);

    console.log('✅ Migraciones completadas correctamente');
  } catch (err) {
    console.error('❌ Error en migraciones:', err);
  }
};

export default runMigrations;
