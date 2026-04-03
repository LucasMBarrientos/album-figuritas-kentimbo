import fs from 'fs';
import path from 'path';

// Leer el JSON
const data = JSON.parse(fs.readFileSync('./equiposkentimbo.json', 'utf8'));

// Asegurar que todos los equipos tengan escudo
data.equipos.forEach(equipo => {
  if (!equipo.hasOwnProperty('escudo')) {
    equipo.escudo = null;
  }
  
  // Asegurar que todos los jugadores tengan foto
  if (equipo.jugadores && Array.isArray(equipo.jugadores)) {
    equipo.jugadores.forEach(jugador => {
      if (!jugador.hasOwnProperty('foto')) {
        jugador.foto = null;
      }
    });
  }
});

// Guardar el JSON actualizado
fs.writeFileSync('./equiposkentimbo.json', JSON.stringify(data, null, 4));
console.log('✅ Campos escudo y foto agregados a todos los registros');
