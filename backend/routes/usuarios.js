import express from 'express';
import pool from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Obtener perfil del usuario
router.get('/perfil', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, email, created_at FROM usuarios WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener perfil:', err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// Obtener sobres del usuario
router.get('/sobres', verifyToken, async (req, res) => {
  try {
    // Obtener fecha actual en Argentina en formato DATE
    const fechaArgentinaRes = await pool.query(
      `SELECT (CURRENT_DATE AT TIME ZONE 'America/Argentina/Buenos_Aires')::DATE as hoy`
    );
    const hoyArgentina = fechaArgentinaRes.rows[0].hoy;

    const result = await pool.query(
      `SELECT 
        COALESCE(sobres_disponibles, 0) as sobres,
        COALESCE(ultimo_dia_sobre, DATE '1999-01-01') as ultimo_dia_sobre
      FROM usuarios 
      WHERE id = $1`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const userData = result.rows[0];
    let sobres = userData.sobres;
    const ultimoDiaGuardado = userData.ultimo_dia_sobre;

    console.log(`🔍 Usuario ${req.userId}: hoy=${hoyArgentina}, último_dia=${ultimoDiaGuardado}, sobres=${sobres}`);

    // Si el último día es diferente al de hoy, agregar 1 sobre
    if (ultimoDiaGuardado < hoyArgentina) {
      console.log(`✅ Agregando 1 sobre (ayer fue ${ultimoDiaGuardado}, hoy es ${hoyArgentina})`);
      sobres = userData.sobres + 1;
      
      await pool.query(
        `UPDATE usuarios 
         SET sobres_disponibles = $1, 
             ultimo_dia_sobre = (CURRENT_DATE AT TIME ZONE 'America/Argentina/Buenos_Aires')::DATE
         WHERE id = $2`,
        [sobres, req.userId]
      );
    } else {
      console.log(`⏸️ No agregar sobre (ya agregado hoy: ${ultimoDiaGuardado})`);
    }

    res.json({ sobres });
  } catch (err) {
    console.error('Error al obtener sobres:', err);
    res.status(500).json({ error: 'Error al obtener sobres' });
  }
});

// Abrir sobre (decrementar sobres)
router.post('/abrir-sobre', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE usuarios 
       SET sobres_disponibles = GREATEST(0, COALESCE(sobres_disponibles, 1) - 1)
       WHERE id = $1 AND COALESCE(sobres_disponibles, 1) > 0
       RETURNING sobres_disponibles`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'No tienes sobres disponibles' });
    }

    res.json({ sobres: result.rows[0].sobres_disponibles });
  } catch (err) {
    console.error('Error al abrir sobre:', err);
    res.status(500).json({ error: 'Error al abrir sobre' });
  }
});

export default router;
