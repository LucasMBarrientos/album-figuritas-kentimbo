import pool from './config/database.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 Sembrando base de datos...');

    // Limpiar datos existentes
    await pool.query('DELETE FROM figuritas_usuario');
    await pool.query('DELETE FROM jugadores');
    await pool.query('DELETE FROM equipos');

    // Insertar equipos
    const equipos = [
      { nombre: 'Lakers', emoji: '🟣' },
      { nombre: 'Celtics', emoji: '🟢' },
      { nombre: 'Warriors', emoji: '💛' },
      { nombre: 'Heat', emoji: '🔴' },
      { nombre: 'Nets', emoji: '⚫' },
      { nombre: 'Bucks', emoji: '🟢' },
      { nombre: 'Mavericks', emoji: '🔵' },
      { nombre: 'Suns', emoji: '🟠' },
    ];

    const equipoIds = {};
    for (const equipo of equipos) {
      const result = await pool.query(
        'INSERT INTO equipos (nombre, emoji) VALUES ($1, $2) RETURNING id',
        [equipo.nombre, equipo.emoji]
      );
      equipoIds[equipo.nombre] = result.rows[0].id;
    }

    console.log('✅ Equipos insertados');

    // Jugadores por equipo
    const jugadores = [
      // Lakers
      { nombre: 'LeBron James', equipo: 'Lakers', numero: 23, avatar_emoji: '👑' },
      { nombre: 'Anthony Davis', equipo: 'Lakers', numero: 3, avatar_emoji: '🏀' },
      { nombre: 'Austin Reaves', equipo: 'Lakers', numero: 1, avatar_emoji: '✨' },
      { nombre: 'D\'Angelo Russell', equipo: 'Lakers', numero: 0, avatar_emoji: '🎯' },
      { nombre: 'Rui Hachimura', equipo: 'Lakers', numero: 28, avatar_emoji: '⚡' },
      { nombre: 'Christian Wood', equipo: 'Lakers', numero: 5, avatar_emoji: '💪' },
      { nombre: 'Jaxson Hayes', equipo: 'Lakers', numero: 10, avatar_emoji: '🔥' },
      { nombre: 'Maxwell Lewis', equipo: 'Lakers', numero: 2, avatar_emoji: '📈' },

      // Celtics  
      { nombre: 'Jayson Tatum', equipo: 'Celtics', numero: 0, avatar_emoji: '🌟' },
      { nombre: 'Jaylen Brown', equipo: 'Celtics', numero: 7, avatar_emoji: '💨' },
      { nombre: 'Derrick White', equipo: 'Celtics', numero: 9, avatar_emoji: '🛡️' },
      { nombre: 'Kristaps Porzingis', equipo: 'Celtics', numero: 3, avatar_emoji: '🪜' },
      { nombre: 'Al Horford', equipo: 'Celtics', numero: 42, avatar_emoji: '🧠' },
      { nombre: 'Sam Hauser', equipo: 'Celtics', numero: 30, avatar_emoji: '🎯' },

      // Warriors
      { nombre: 'Stephen Curry', equipo: 'Warriors', numero: 30, avatar_emoji: '🐐' },
      { nombre: 'Klay Thompson', equipo: 'Warriors', numero: 11, avatar_emoji: '🎪' },
      { nombre: 'Andrew Wiggins', equipo: 'Warriors', numero: 22, avatar_emoji: '⛹️' },
      { nombre: 'Kevon Looney', equipo: 'Warriors', numero: 5, avatar_emoji: '🧱' },
      { nombre: 'Jonathan Kuminga', equipo: 'Warriors', numero: 0, avatar_emoji: '🚀' },

      // Heat
      { nombre: 'Jimmy Butler', equipo: 'Heat', numero: 22, avatar_emoji: '🔐' },
      { nombre: 'Bam Adebayo', equipo: 'Heat', numero: 13, avatar_emoji: '🦁' },
      { nombre: 'Kyle Lowry', equipo: 'Heat', numero: 3, avatar_emoji: '🧭' },
      { nombre: 'Tyler Herro', equipo: 'Heat', numero: 14, avatar_emoji: '🌡️' },

      // Nets
      { nombre: 'Mikal Bridges', equipo: 'Nets', numero: 1, avatar_emoji: '🌉' },
      { nombre: 'Cameron Thomas', equipo: 'Nets', numero: 24, avatar_emoji: '💣' },
      { nombre: 'Nic Claxton', equipo: 'Nets', numero: 33, avatar_emoji: '🏗️' },

      // Bucks
      { nombre: 'Giannis Antetokounmpo', equipo: 'Bucks', numero: 34, avatar_emoji: '🦌' },
      { nombre: 'Damian Lillard', equipo: 'Bucks', numero: 0, avatar_emoji: '🏹' },
      { nombre: 'Khris Middleton', equipo: 'Bucks', numero: 22, avatar_emoji: '🎨' },

      // Mavericks
      { nombre: 'Luka Doncic', equipo: 'Mavericks', numero: 77, avatar_emoji: '🌌' },
      { nombre: 'Kyrie Irving', equipo: 'Mavericks', numero: 11, avatar_emoji: '🌙' },
      { nombre: 'Derrick Jones Jr.', equipo: 'Mavericks', numero: 3, avatar_emoji: '🤸' },

      // Suns
      { nombre: 'Kevin Durant', equipo: 'Suns', numero: 35, avatar_emoji: '🗡️' },
      { nombre: 'Devin Booker', equipo: 'Suns', numero: 1, avatar_emoji: '📚' },
      { nombre: 'Bradley Beal', equipo: 'Suns', numero: 3, avatar_emoji: '💎' },
      { nombre: 'Jusuf Nurkic', equipo: 'Suns', numero: 20, avatar_emoji: '⛰️' },
    ];

    for (const jugador of jugadores) {
      await pool.query(
        `INSERT INTO jugadores (nombre, numero_camiseta, equipo_id, avatar_emoji)
         VALUES ($1, $2, $3, $4)`,
        [jugador.nombre, jugador.numero, equipoIds[jugador.equipo], jugador.avatar_emoji]
      );
    }

    console.log('✅ Jugadores insertados');
    console.log('🌱 Base de datos sembrada correctamente');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error sembrando BD:', err);
    process.exit(1);
  }
};

seedDatabase();
