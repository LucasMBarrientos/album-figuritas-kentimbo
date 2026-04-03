import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Soportar tanto DATABASE_URL (Render) como variables individuales (local)
let pool;

if (process.env.DATABASE_URL) {
  // Render.com - usa DATABASE_URL
  console.log('📡 Conectando con DATABASE_URL (Render)...');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
} else {
  // Local - usa variables individuales
  console.log('📡 Conectando con variables (Local)...');
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
}

pool.on('error', (err) => {
  console.error('❌ Error inesperado en el pool de conexiones:', err);
});

// Crear tablas si no existen
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS equipos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        emoji VARCHAR(10),
        color VARCHAR(7),
        fundacion VARCHAR(100),
        estadio VARCHAR(100),
        capacidad VARCHAR(50),
        entrenador VARCHAR(100),
        rivalidades TEXT,
        escudo TEXT
      );

      CREATE TABLE IF NOT EXISTS jugadores (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
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
        foto TEXT
      );

      CREATE TABLE IF NOT EXISTS figuritas_usuario (
        id SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
        jugador_id INT REFERENCES jugadores(id),
        pegada BOOLEAN DEFAULT FALSE,
        fecha_obtenida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(usuario_id, jugador_id)
      );

      CREATE INDEX IF NOT EXISTS idx_figuritas_usuario ON figuritas_usuario(usuario_id);
      CREATE INDEX IF NOT EXISTS idx_figuritas_pegadas ON figuritas_usuario(usuario_id, pegada);
    `);
    console.log('✅ Base de datos inicializada correctamente');
    await pool.query(`
      ALTER TABLE equipos
      ADD COLUMN IF NOT EXISTS escudo TEXT
    `);
    await pool.query(`
      ALTER TABLE jugadores
      ADD COLUMN IF NOT EXISTS foto TEXT
    `);
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  }
}

// Inicializar BD al arrancar
initializeDatabase();

export default pool;
