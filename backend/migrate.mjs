import pool from './config/database.js';

async function migrate() {
  try {
    console.log('🔄 Ejecutando migraciones...');

    // Modificar columna color para que acepte textos más largos
    console.log('Actualizando table equipos...');
    await pool.query(`
      ALTER TABLE equipos
      ALTER COLUMN color TYPE VARCHAR(50)
    `);
    console.log('✓ Columna color expandida');

    // Agregar columnas a equipos si no existen
    await pool.query(`
      ALTER TABLE equipos
      ADD COLUMN IF NOT EXISTS fundacion VARCHAR(100),
      ADD COLUMN IF NOT EXISTS estadio VARCHAR(100),
      ADD COLUMN IF NOT EXISTS capacidad VARCHAR(20),
      ADD COLUMN IF NOT EXISTS entrenador VARCHAR(100),
      ADD COLUMN IF NOT EXISTS rivalidades VARCHAR(255)
    `);
    console.log('✓ Tabla equipos actualizada');

    // Agregar columnas a jugadores si no existen
    console.log('Actualizando tabla jugadores...');
    await pool.query(`
      ALTER TABLE jugadores
      ADD COLUMN IF NOT EXISTS altura INT,
      ADD COLUMN IF NOT EXISTS edad INT,
      ADD COLUMN IF NOT EXISTS pie VARCHAR(1),
      ADD COLUMN IF NOT EXISTS valoracion INT,
      ADD COLUMN IF NOT EXISTS foto TEXT
    `);
    console.log('✓ Tabla jugadores actualizada');

    console.log('\n✅ Migraciones completadas');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en migraciones:', error);
    process.exit(1);
  }
}

migrate();
