import express from 'express';
import pool from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// DEBUG: Obtener datos en bruto
router.get('/debug/equipos', async (req, res) => {
  try {
    const equipos = await pool.query('SELECT * FROM equipos LIMIT 3');
    const jugadores = await pool.query('SELECT * FROM jugadores LIMIT 3');
    res.json({
      equipos: equipos.rows,
      jugadores: jugadores.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las figuritas del usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT j.id, j.nombre, j.numero_camiseta, j.posicion, j.avatar_emoji, 
             j.altura, j.edad, j.pie, j.valoracion, j.foto,
             e.id as equipo_id, e.nombre as equipo_nombre, e.emoji, e.color,
             e.fundacion, e.estadio, e.capacidad, e.entrenador, e.rivalidades, e.escudo,
             COALESCE(fu.id, j.id) as figurita_id, COALESCE(fu.pegada, false) as pegada
      FROM jugadores j
      LEFT JOIN equipos e ON j.equipo_id = e.id
      LEFT JOIN figuritas_usuario fu ON j.id = fu.jugador_id AND fu.usuario_id = $1
      ORDER BY e.id, j.numero_camiseta
    `, [req.userId]);

    console.log('✅ Figuritas query result:', result.rows.length, 'rows');
    if (result.rows.length > 0) {
      console.log('📝 First row:', JSON.stringify(result.rows[0], null, 2));
    }
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener figuritas:', err);
    res.status(500).json({ error: 'Error al obtener figuritas' });
  }
});

// Obtener estadísticas
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(DISTINCT CASE WHEN fu.pegada = true THEN fu.id END) as pegadas,
        COUNT(DISTINCT j.id) as total,
        COUNT(DISTINCT CASE WHEN fu.id IS NULL THEN j.id END) as faltantes,
        COUNT(DISTINCT e.id) as equipos_completos
      FROM jugadores j
      LEFT JOIN equipos e ON j.equipo_id = e.id
      LEFT JOIN figuritas_usuario fu ON j.id = fu.jugador_id AND fu.usuario_id = $1
    `, [req.userId]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener estadísticas:', err);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// Pegar figurita
router.post('/:figuritaId/pegar', verifyToken, async (req, res) => {
  try {
    const { figuritaId } = req.params;

    const result = await pool.query(`
      INSERT INTO figuritas_usuario (usuario_id, jugador_id, pegada)
      VALUES ($1, $2, true)
      ON CONFLICT (usuario_id, jugador_id)
      DO UPDATE SET pegada = true
      RETURNING *
    `, [req.userId, figuritaId]);

    res.json({
      message: 'Figurita pegada',
      figurita: result.rows[0]
    });
  } catch (err) {
    console.error('Error al pegar figurita:', err);
    res.status(500).json({ error: 'Error al pegar figurita' });
  }
});

// Quitar figurita
router.post('/:figuritaId/quitar', verifyToken, async (req, res) => {
  try {
    const { figuritaId } = req.params;

    await pool.query(`
      DELETE FROM figuritas_usuario
      WHERE usuario_id = $1 AND jugador_id = $2
    `, [req.userId, figuritaId]);

    res.json({ message: 'Figurita quitada' });
  } catch (err) {
    console.error('Error al quitar figurita:', err);
    res.status(500).json({ error: 'Error al quitar figurita' });
  }
});

export default router;
