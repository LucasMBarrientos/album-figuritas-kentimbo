import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
}

async function seedDatabase() {
  try {
    console.log('\n🌱 Iniciando seed de base de datos...\n');

    // Leer JSON
    const jsonPath = path.join(__dirname, 'equiposkentimbo.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    console.log(`📂 Leyendo ${jsonPath}`);
    console.log(`📊 Equipos encontrados: ${jsonData.equipos.length}\n`);

    // Limpiar datos existentes (Opcional - descomenta si quieres)
    // console.log('🧹 Limpiando datos existentes...');
    // await pool.query('DELETE FROM figuritas_usuario');
    // await pool.query('DELETE FROM jugadores');
    // await pool.query('DELETE FROM equipos');

    // Agregar equipos y jugadores
    let equiposAgregados = 0;
    let jugadoresAgregados = 0;

    for (const equipo of jsonData.equipos) {
      // Insertar equipo
      const equipoResult = await pool.query(
        `INSERT INTO equipos (nombre, color, fundacion, estadio, capacidad, entrenador)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (nombre) DO UPDATE SET nombre=EXCLUDED.nombre
         RETURNING id`,
        [
          equipo.nombre,
          equipo.color || 'Desconocido',
          equipo.fundacion || null,
          equipo.estadio || null,
          equipo.capacidad || null,
          equipo.entrenador || 'Desconocido'
        ]
      );

      const equipoId = equipoResult.rows[0].id;
      equiposAgregados++;

      console.log(`✅ ${equipo.nombre.padEnd(40)} (ID: ${equipoId})`);

      // Insertar jugadores
      if (equipo.jugadores && Array.isArray(equipo.jugadores)) {
        for (const jugador of equipo.jugadores) {
          try {
            await pool.query(
              `INSERT INTO jugadores (nombre, numero, equipo_id)
               VALUES ($1, $2, $3)
               ON CONFLICT (equipo_id, numero) DO UPDATE SET nombre=EXCLUDED.nombre`,
              [
                jugador.nombre || 'Jugador sin nombre',
                jugador.numero || parseInt(Math.random() * 100),
                equipoId
              ]
            );
            jugadoresAgregados++;
          } catch (err) {
            console.error(`   ⚠️  Error insertar jugador ${jugador.nombre}:`, err.message);
          }
        }
      }
    }

    console.log(`\n✅ Seed completado:`);
    console.log(`   📍 Equipos agregados: ${equiposAgregados}`);
    console.log(`   ⚽ Jugadores agregados: ${jugadoresAgregados}\n`);

    // Verificar
    const equiposCount = await pool.query('SELECT COUNT(*) as count FROM equipos');
    const jugadoresCount = await pool.query('SELECT COUNT(*) as count FROM jugadores');

    console.log('📊 Estado actual de la BD:');
    console.log(`   Total Equipos: ${equiposCount.rows[0].count}`);
    console.log(`   Total Jugadores: ${jugadoresCount.rows[0].count}\n`);

    process.exit(0);

  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();
