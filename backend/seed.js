import pool from './config/database.js';

const seed = async () => {
  try {
    // Crear equipos
    const teamsResult = await pool.query(`
      INSERT INTO equipos (nombre, emoji, color) VALUES
      ('Rayos', '⚡', '#FFD700'),
      ('Dragones', '🐉', '#FF6B6B'),
      ('Tigres', '🐯', '#FF8C00'),
      ('Fénix', '🔥', '#FF4500'),
      ('Águilas', '🦅', '#1E90FF'),
      ('Leones', '🦁', '#DAA520'),
      ('Osos', '🐻', '#8B4513'),
      ('Lobos', '🐺', '#696969')
      ON CONFLICT DO NOTHING
      RETURNING id, nombre
    `);

    console.log('✅ Equipos creados:', teamsResult.rows.map(t => t.nombre));

    // Obtener IDs de equipos
    const teamsIds = await pool.query('SELECT id, nombre FROM equipos ORDER BY id');
    const teamMap = {};
    teamsIds.rows.forEach(team => {
      teamMap[team.nombre] = team.id;
    });

    // Crear jugadores (6 por equipo = 48 total)
    const jugadores = [
      // Rayos
      { nombre: 'Volt Striker', numero: 1, posicion: 'POR', equipo: 'Rayos', avatar: '⚡' },
      { nombre: 'Shock Defender', numero: 2, posicion: 'DEF', equipo: 'Rayos', avatar: '⚡' },
      { nombre: 'Lightning Midfielder', numero: 3, posicion: 'MED', equipo: 'Rayos', avatar: '⚡' },
      { nombre: 'Surge Forward', numero: 4, posicion: 'DEL', equipo: 'Rayos', avatar: '⚡' },
      { nombre: 'Blitz Winger', numero: 5, posicion: 'DEL', equipo: 'Rayos', avatar: '⚡' },
      { nombre: 'Jolt Coach', numero: 10, posicion: 'DEL', equipo: 'Rayos', avatar: '⚡' },
      
      // Dragones
      { nombre: 'Drake Keeper', numero: 1, posicion: 'POR', equipo: 'Dragones', avatar: '🐉' },
      { nombre: 'Scale Wall', numero: 2, posicion: 'DEF', equipo: 'Dragones', avatar: '🐉' },
      { nombre: 'Fire Breather', numero: 3, posicion: 'MED', equipo: 'Dragones', avatar: '🐉' },
      { nombre: 'Wing Master', numero: 4, posicion: 'DEL', equipo: 'Dragones', avatar: '🐉' },
      { nombre: 'Tail Spinner', numero: 5, posicion: 'MED', equipo: 'Dragones', avatar: '🐉' },
      { nombre: 'Dragon Lord', numero: 10, posicion: 'DEL', equipo: 'Dragones', avatar: '🐉' },
      
      // Tigres
      { nombre: 'Stripe Guardian', numero: 1, posicion: 'POR', equipo: 'Tigres', avatar: '🐯' },
      { nombre: 'Fang Defender', numero: 2, posicion: 'DEF', equipo: 'Tigres', avatar: '🐯' },
      { nombre: 'Claw Fighter', numero: 3, posicion: 'MED', equipo: 'Tigres', avatar: '🐯' },
      { nombre: 'Beast Striker', numero: 4, posicion: 'DEL', equipo: 'Tigres', avatar: '🐯' },
      { nombre: 'Roar Master', numero: 5, posicion: 'DEL', equipo: 'Tigres', avatar: '🐯' },
      { nombre: 'Stripe King', numero: 10, posicion: 'DEL', equipo: 'Tigres', avatar: '🐯' },
      
      // Fénix
      { nombre: 'Flame Keeper', numero: 1, posicion: 'POR', equipo: 'Fénix', avatar: '🔥' },
      { nombre: 'Ash Wall', numero: 2, posicion: 'DEF', equipo: 'Fénix', avatar: '🔥' },
      { nombre: 'Rise Fighter', numero: 3, posicion: 'MED', equipo: 'Fénix', avatar: '🔥' },
      { nombre: 'Blaze Forward', numero: 4, posicion: 'DEL', equipo: 'Fénix', avatar: '🔥' },
      { nombre: 'Spark Winger', numero: 5, posicion: 'DEL', equipo: 'Fénix', avatar: '🔥' },
      { nombre: 'Phoenix Supreme', numero: 10, posicion: 'DEL', equipo: 'Fénix', avatar: '🔥' },
      
      // Águilas
      { nombre: 'Sky Keeper', numero: 1, posicion: 'POR', equipo: 'Águilas', avatar: '🦅' },
      { nombre: 'Talon Defender', numero: 2, posicion: 'DEF', equipo: 'Águilas', avatar: '🦅' },
      { nombre: 'Soar Midfielder', numero: 3, posicion: 'MED', equipo: 'Águilas', avatar: '🦅' },
      { nombre: 'Wing Striker', numero: 4, posicion: 'DEL', equipo: 'Águilas', avatar: '🦅' },
      { nombre: 'Nest Builder', numero: 5, posicion: 'MED', equipo: 'Águilas', avatar: '🦅' },
      { nombre: 'Eagle Eye', numero: 10, posicion: 'DEL', equipo: 'Águilas', avatar: '🦅' },
      
      // Leones
      { nombre: 'Mane Keep', numero: 1, posicion: 'POR', equipo: 'Leones', avatar: '🦁' },
      { nombre: 'Pride Wall', numero: 2, posicion: 'DEF', equipo: 'Leones', avatar: '🦁' },
      { nombre: 'Roar Fighter', numero: 3, posicion: 'MED', equipo: 'Leones', avatar: '🦁' },
      { nombre: 'Hunt Master', numero: 4, posicion: 'DEL', equipo: 'Leones', avatar: '🦁' },
      { nombre: 'Claw Grip', numero: 5, posicion: 'DEL', equipo: 'Leones', avatar: '🦁' },
      { nombre: 'Lion King', numero: 10, posicion: 'DEL', equipo: 'Leones', avatar: '🦁' },
      
      // Osos
      { nombre: 'Strength Keeper', numero: 1, posicion: 'POR', equipo: 'Osos', avatar: '🐻' },
      { nombre: 'Solid Wall', numero: 2, posicion: 'DEF', equipo: 'Osos', avatar: '🐻' },
      { nombre: 'Paw Fighter', numero: 3, posicion: 'MED', equipo: 'Osos', avatar: '🐻' },
      { nombre: 'Heavy Strike', numero: 4, posicion: 'DEL', equipo: 'Osos', avatar: '🐻' },
      { nombre: 'Furious Fighter', numero: 5, posicion: 'DEL', equipo: 'Osos', avatar: '🐻' },
      { nombre: 'Bear Force', numero: 10, posicion: 'DEL', equipo: 'Osos', avatar: '🐻' },
      
      // Lobos
      { nombre: 'Howl Keeper', numero: 1, posicion: 'POR', equipo: 'Lobos', avatar: '🐺' },
      { nombre: 'Pack Wall', numero: 2, posicion: 'DEF', equipo: 'Lobos', avatar: '🐺' },
      { nombre: 'Hunt Fighter', numero: 3, posicion: 'MED', equipo: 'Lobos', avatar: '🐺' },
      { nombre: 'Fang Striker', numero: 4, posicion: 'DEL', equipo: 'Lobos', avatar: '🐺' },
      { nombre: 'Pack Leader', numero: 5, posicion: 'DEL', equipo: 'Lobos', avatar: '🐺' },
      { nombre: 'Wolf Alpha', numero: 10, posicion: 'DEL', equipo: 'Lobos', avatar: '🐺' }
    ];

    for (const jug of jugadores) {
      const equipoId = teamMap[jug.equipo];
      await pool.query(
        `INSERT INTO jugadores (nombre, numero_camiseta, posicion, equipo_id, avatar_emoji)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [jug.nombre, jug.numero, jug.posicion, equipoId, jug.avatar]
      );
    }

    console.log('✅ Jugadores creados: 48 jugadores (6 por equipo)');
    console.log('✨ Base de datos poblada correctamente');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al popular la BD:', err);
    process.exit(1);
  }
};

seed();
