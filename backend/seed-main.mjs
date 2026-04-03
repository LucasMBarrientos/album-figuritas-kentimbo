import pool from './config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mapeo de emojis para equipos
const emojiMap = {
  "Altardez Verdi-Rojo": "🔴",
  "Asociación Alburgo de Kentucky": "🏛️",
  "Asociación Alburgo de Maltania": "🦅",
  "Athletic Club Tigers": "🐯",
  "Black Dragons Fútbol Club": "🐉",
  "Breffud Club de Fútbol": "🏰",
  "Chambo Fútbol Club": "🌾",
  "Club Atlético Akatsuki": "🌑",
  "Club Atlético Gatunos": "🐱",
  "Club Atlético Lions": "🦁",
  "Club Atlético Perrunos": "🐕",
  "Club Atlético Pochoclo": "🍿",
  "Club Atlético Pescopagano": "🐟",
  "Club Atlético Sarpag": "🦐",
  "C.D. Miralbueno": "✨",
  "Deportivo Zorura": "🦊",
  "Deportivo Internacional": "🌍",
  "Fieshida Fútbol Club": "🌊",
  "Kentucky Fútbol Club": "🤠",
  "Liberty Club de Fútbol": "🗽",
  "Dintra Ferdinand Kazem": "🎭"
};

async function seed() {
  try {
    console.log('🌱 Iniciando seeding de datos desde JSON...');

    // Limpiar tablas existentes
    await pool.query('DELETE FROM figuritas_usuario');
    await pool.query('DELETE FROM jugadores');
    await pool.query('DELETE FROM equipos');
    console.log('✓ Tablas limpiadas');

    // Leer JSON con los datos
    const jsonPath = path.join(__dirname, 'equiposkentimbo.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    const equipoIds = {};
    let totalJugadores = 0;

    // Insertar equipos y jugadores
    for (const equipo of jsonData.equipos) {
      // Procesar rivalidades
      const rivalidades = Array.isArray(equipo.rivalidades) 
        ? equipo.rivalidades.join(', ') 
        : equipo.rivalidades;

      // Obtener emoji del mapeo
      const emoji = emojiMap[equipo.nombre] || '⚽';

      // Insertar equipo
      const equipoResult = await pool.query(
        `INSERT INTO equipos (nombre, emoji, color, fundacion, estadio, capacidad, entrenador, rivalidades, escudo) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
         RETURNING id`,
        [
          equipo.nombre,
          emoji,
          equipo.color || '#000000',
          equipo.fundacion || '',
          equipo.estadio || '',
          equipo.capacidad || '',
          equipo.entrenador || '',
          rivalidades || '',
          equipo.escudo || null
        ]
      );
      const equipoId = equipoResult.rows[0].id;
      equipoIds[equipo.nombre] = equipoId;
      console.log(`✓ Equipo "${equipo.nombre}" creado`);

      // Insertar jugadores del equipo
      for (let i = 0; i < equipo.jugadores.length; i++) {
        const jugador = equipo.jugadores[i];
        await pool.query(
          `INSERT INTO jugadores (nombre, numero_camiseta, posicion, equipo_id, avatar_emoji, altura, edad, pie, valoracion, foto) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            jugador.nombre || '',
            i + 1,
            jugador.posicion || '',
            equipoId,
            '⚽',
            parseInt(jugador.altura) || null,
            parseInt(jugador.edad) || null,
            jugador.pie || '',
            parseInt(jugador.valoracion) || null,
            jugador.foto || null
          ]
        );
        totalJugadores++;
      }
      console.log(`  └─ ${equipo.jugadores.length} jugadores agregados`);
    }

    console.log('\n✅ Seeding completado exitosamente');
    console.log(`📊 Total: ${Object.keys(equipoIds).length} equipos, ${totalJugadores} jugadores`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante seeding:', error);
    process.exit(1);
  }
}

seed();
