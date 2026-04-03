const pool = require('./db');
const fs = require('fs');
const path = require('path');

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
      // Insertar equipo
      const equipoResult = await pool.query(
        `INSERT INTO equipos (nombre, emoji, color, fundacion, estadio, capacidad, entrenador, rivalidades) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING id`,
        [
          equipo.nombre,
          equipo.emoji,
          equipo.color,
          equipo.fundacion,
          equipo.estadio,
          equipo.capacidad,
          equipo.entrenador,
          equipo.rivalidades
        ]
      );
      const equipoId = equipoResult.rows[0].id;
      equipoIds[equipo.nombre] = equipoId;
      console.log(`✓ Equipo "${equipo.nombre}" (${equipo.emoji}) creado`);

      // Insertar jugadores del equipo
      for (const jugador of equipo.jugadores) {
        await pool.query(
          `INSERT INTO jugadores (nombre, numero_camiseta, posicion, equipo_id, avatar_emoji) 
           VALUES ($1, $2, $3, $4, $5)`,
          [
            jugador.nombre,
            jugador.numero,
            jugador.posicion,
            equipoId,
            jugador.emoji
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
