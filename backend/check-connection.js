import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Opción 1: Si tienes DATABASE_URL (como en Render)
let pool;

if (process.env.DATABASE_URL) {
  console.log('📡 Usando DATABASE_URL (Render)...');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Siempre SSL para Render
  });
} else {
  // Opción 2: Variables individuales
  console.log('📡 Usando variables individuales (Local)...');
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
}

async function checkConnection() {
  try {
    console.log('\n🔍 Verificando conexión a PostgreSQL...\n');

    // Test 1: Conectar
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Conexión exitosa!');
    console.log(`   Hora en BD: ${result.rows[0].now}\n`);

    // Test 2: Ver tablas
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log('📊 Tablas en BD:');
    if (tables.rows.length === 0) {
      console.log('   (Ninguna - Las migraciones crearán las tablas)\n');
    } else {
      tables.rows.forEach(t => console.log(`   - ${t.table_name}`));
      console.log();
    }

    // Test 3: Ver datos en cada tabla
    const equipos = await pool.query('SELECT COUNT(*) as count FROM equipos').catch(() => null);
    const usuarios = await pool.query('SELECT COUNT(*) as count FROM usuarios').catch(() => null);
    const jugadores = await pool.query('SELECT COUNT(*) as count FROM jugadores').catch(() => null);
    const figuritas = await pool.query('SELECT COUNT(*) as count FROM figuritas_usuario').catch(() => null);

    console.log('📈 Registros por tabla:');
    if (equipos) console.log(`   📍 Equipos: ${equipos.rows[0].count}`);
    if (usuarios) console.log(`   👤 Usuarios: ${usuarios.rows[0].count}`);
    if (jugadores) console.log(`   ⚽ Jugadores: ${jugadores.rows[0].count}`);
    if (figuritas) console.log(`   🎴 Figuritas Usuario: ${figuritas.rows[0].count}`);
    console.log();

    // Test 4: Ver equipos
    const equiposList = await pool.query('SELECT id, nombre FROM equipos ORDER BY id').catch(() => null);
    if (equiposList && equiposList.rows.length > 0) {
      console.log('⚽ Equipos en BD:');
      equiposList.rows.forEach(e => {
        console.log(`   #${e.id}: ${e.nombre}`);
      });
    }

    console.log('\n✅ Todo está conectado correctamente!\n');
    process.exit(0);

  } catch (err) {
    console.error('\n❌ Error de conexión:');
    console.error(`   ${err.message}\n`);
    console.error('Verifica:');
    console.error('  1. ¿PostgreSQL está corriendo?');
    console.error('  2. ¿Las variables de .env son correctas?');
    console.error('  3. ¿DATABASE_URL o {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME}?\n');
    process.exit(1);
  }
}

checkConnection();
