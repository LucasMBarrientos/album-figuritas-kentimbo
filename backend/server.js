import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js';
import runMigrations from './migrations.js';

// Rutas
import authRoutes from './routes/auth.js';
import figuritasRoutes from './routes/figuritas.js';
import usuariosRoutes from './routes/usuarios.js';

dotenv.config();

// Global error handlers
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://album-figuritas-kentimbo.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/figuritas', figuritasRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Ejecutar migraciones e iniciar servidor
const startServer = async () => {
  try {
    await runMigrations();
    
    app.listen(PORT, () => {
      console.log(`\n╔════════════════════════════════════════╗`);
      console.log(`║   🏆 SERVIDOR ÁLBUM FIGURITAS        ║`);
      console.log(`╚════════════════════════════════════════╝`);
      console.log(`\n✅ Servidor escuchando en puerto ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📝 Fronted en: http://localhost:3000\n`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar servidor:', err);
    process.exit(1);
  }
};

startServer();
