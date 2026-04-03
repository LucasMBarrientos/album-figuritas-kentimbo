import pool from './config/database.js';

const runMigrations = async () => {
  try {
    console.log('🔄 Ejecutando migraciones...');

    // 1. Crear tabla usuarios si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        sobres_disponibles INTEGER DEFAULT 2,
        ultimo_dia_sobre DATE DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabla usuarios creada/verificada');

    // 2. Crear tabla equipos si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS equipos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        emoji VARCHAR(10),
        color VARCHAR(100),
        fundacion VARCHAR(100),
        estadio VARCHAR(100),
        capacidad VARCHAR(50),
        entrenador VARCHAR(100),
        rivalidades TEXT,
        escudo TEXT
      );
    `);
    console.log('✅ Tabla equipos creada/verificada');

    // 3. Crear tabla jugadores si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jugadores (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        numero INT,
        numero_camiseta INT,
        posicion VARCHAR(50),
        equipo_id INT REFERENCES equipos(id),
        velocidad INT,
        fuerza INT,
        avatar_emoji VARCHAR(10),
        altura VARCHAR(20),
        edad INT,
        pie VARCHAR(20),
        valoracion DECIMAL(5,2),
        foto TEXT,
        UNIQUE(equipo_id, numero)
      );
    `);
    console.log('✅ Tabla jugadores creada/verificada');

    // 4. Crear tabla figuritas_usuario si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS figuritas_usuario (
        id SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
        jugador_id INT REFERENCES jugadores(id),
        pegada BOOLEAN DEFAULT FALSE,
        fecha_obtenida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(usuario_id, jugador_id)
      );
    `);
    console.log('✅ Tabla figuritas_usuario creada/verificada');

    // 5. Crear índices
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_figuritas_usuario ON figuritas_usuario(usuario_id);
      CREATE INDEX IF NOT EXISTS idx_figuritas_pegadas ON figuritas_usuario(usuario_id, pegada);
    `);
    console.log('✅ Índices creados/verificados');

    // 6. Agregar columnas nuevas si no existen
    await pool.query(`
      ALTER TABLE usuarios
      ADD COLUMN IF NOT EXISTS sobres_disponibles INTEGER DEFAULT 2;
    `);

    // 7. Expandir campo color en equipos si es necesario
    await pool.query(`
      ALTER TABLE equipos
      ALTER COLUMN color TYPE VARCHAR(100);
    `);

    await pool.query(`
      ALTER TABLE usuarios
      ADD COLUMN IF NOT EXISTS ultimo_dia_sobre DATE DEFAULT NULL;
    `);

    // 8. Eliminar columnas antiguas si existen
    await pool.query(`
      ALTER TABLE usuarios
      DROP COLUMN IF EXISTS ultimo_sobre_abierto;
    `);

    console.log('✅ Migraciones completadas correctamente\n');
  } catch (err) {
    console.error('❌ Error en migraciones:', err);
    throw err;
  }
};

export default runMigrations;
