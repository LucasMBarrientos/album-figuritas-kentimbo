# ⚡ Quick Start Guide

## 🚀 Iniciar Desarrollo Local

### 1️⃣ Prerequisitos
- Node.js 18+ 
- PostgreSQL 14+
- Git

### 2️⃣ Configurar Backend

```bash
cd backend
npm install

# Crear archivo .env
echo "DATABASE_URL=postgresql://user:password@localhost:5432/figuritas_bd
PORT=5000
JWT_SECRET=tu_secreto_super_seguro" > .env

# Iniciar servidor (escuchará en http://localhost:5000)
npm start
```

**O con watch mode:**
```bash
npm run dev
```

### 3️⃣ Configurar Frontend

```bash
cd frontend
npm install

# Crear archivo .env
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Iniciar (abrirá en http://localhost:3000)
npm start
```

### 4️⃣ Inicializar Base de Datos

**Opción A: Automática**
- El servidor ejecutará migraciones automáticamente al iniciar ✅

**Opción B: Manual**
```bash
cd backend
npm run seed
```

## ✅ Verificación

- ✅ Backend: http://localhost:5000/api (GET /equipos)
- ✅ Frontend: http://localhost:3000
- ✅ Registrarse → Login → Ver álbum
- ✅ Abrir 2 sobres → Ver jugadores dorados

## 🔄 Git Workflow

```bash
# Clonar si es necesario
git clone <tu-repo>

# Trabajar
git add .
git commit -m "descripción"
git push
```

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Puerto 5000 en uso | `lsof -i :5000` y matar proceso |
| BD no conecta | Verificar DATABASE_URL en .env |
| CORS error | Asegurar REACT_APP_API_URL correcto |
| Módulos no encontrados | `npm install` en ambas carpetas |

## 📦 Dependencias Principales

**Backend:**
- express (servidor web)
- pg (PostgreSQL)
- jsonwebtoken (autenticación)
- bcryptjs (encriptación)

**Frontend:**
- react (UI)
- axios (HTTP)
- react-router-dom (navegación)

## 💡 Tips

- Usar `npm install --legacy-peer-deps` si hay conflictos
- Variables de entorno NUNCA en commit (están en .gitignore)
- Logs del servidor muestran en consola
- React DevTools recomendado

## 🚢 Deployment

Ver `DEPLOYMENT.md` para Render.com + Vercel

---

**Tiempo estimado:** 10 minutos
