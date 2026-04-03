# 🚀 Guía de Deployment - Álbum Figuritas

## Opción Recomendada (Más Fácil)

### **Frontend → Vercel + Backend → Render.com**

---

## PASO 1: Preparar GitHub

### 1.1 Crear repositorio

✅ **Ya hecho!** Tu repositorio está en:
```
https://github.com/LucasMBarrientos/album-figuritas-kentimbo
```

Verifica que esté público para que otros puedan acceder.

### 1.2 Subir código a GitHub

```bash
cd "c:\Users\Lucas\OneDrive\Escritorio\album figuritas kentimbo"

# Inicializar git
git init
git add .
git commit -m "Initial commit: App de figuritas"

# Agregar remote
git branch -M main
git remote add origin https://github.com/LucasMBarrientos/album-figuritas-kentimbo.git
git push -u origin main
```

---

## PASO 2: Desplegar Backend en Render.com

### 2.1 Crear cuenta en Render

1. Ve a [render.com](https://render.com)
2. Sign up con GitHub (más fácil)
3. Autoriza Render a acceder a tu GitHub

### 2.2 Crear Web Service

1. Panel → "New +" → "Web Service"
2. Selecciona tu repositorio `album-figuritas-kentimbo`
3. Configura:
   - **Name:** `album-figuritas-backend`
   - **Environment:** `Node`
   - **Root Directory:** `backend` ⭐ **IMPORTANTE**
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

### 2.3 Agregar Base de Datos

1. Panel → "New +" → "PostgreSQL"
2. Configura:
   - **Name:** `album-figuritas-db`
   - **Plan:** Free
3. Copia la connection string

### 2.4 Variables de Entorno

En el Web Service, ve a "Environment":

```
PORT=5000
JWT_SECRET=tu_secreto_super_mega_seguro_123456789
JWT_EXPIRE=7d
FRONTEND_URL=https://album-figuritas-kentimbo.vercel.app
NODE_ENV=production
```

💡 **Nota:** La conexión a PostgreSQL se configura automáticamente desde la BD que creaste. Render genera `DATABASE_URL` automáticamente.

### 2.5 Deploy

1. Haz clic en "Create Web Service"
2. Espera a que compile (5-10 min)
3. Verás un URL como: `https://album-figuritas-backend.onrender.com`
4. 📌 **Guarda este URL**

---

## PASO 3: Desplegar Frontend en Vercel

### 3.1 Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Sign up con GitHub

### 3.2 Importar Proyecto

1. "Import Project" → Selecciona `album-figuritas-kentimbo`
2. Root directory: `frontend/`
3. En "Environment Variables" agrega:

```
REACT_APP_API_URL=https://album-figuritas-backend.onrender.com/api
```

### 3.3 Deploy

1. Haz clic en "Deploy"
2. Espera a que compile (2-5 min)
3. Verás un URL como: `https://album-figuritas-kentimbo.vercel.app`
4. ✅ **¡Tu app está online!**

---

## PASO 4: Configurar CORS

El backend necesita permitir tu frontend. En `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://album-figuritas-kentimbo.vercel.app'
  ],
  credentials: true
}));
```

---

## PASO 5: Poblando la Base de Datos

Una vez deployado, necesitas agregar equipos y jugadores:

1. Conéctate a PostgreSQL desde Render
2. Ejecuta el SQL de setup:

```sql
-- Equipos
INSERT INTO equipos (nombre, emoji) VALUES 
('Lakers', '🟣'),
('Celtics', '🟢'),
('Warriors', '🟡'),
...
```

O usa el script `seed.js` en el backend.

---

## 🧪 Testear la Aplicación

1. Ve a `https://album-figuritas-kentimbo.vercel.app`
2. Registrate con un email de prueba
3. ¡Comienza a coleccionar!

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| "Cannot read package.json: ENOENT" | En Render Settings, establece Root Directory: `backend` |
| "Cannot GET /api/figuritas" | Backend no está corriendo. Verifica Render logs |
| CORS error | Asegúrate que REACT_APP_API_URL tiene la URL de Render backend |
| BD no responde | En Render, conecta el PostgreSQL database al Web Service |
| Error 500 | Revisa logs en Render: "Runtime→Logs" |

---

## 📱 Compartir Link

Una vez todo funcione, comparte este link:
```
https://album-figuritas-kentimbo.vercel.app
```

La gente podrá acceder directamente, ¡sin instalar nada!

---

## ✅ Checklist Final

- [ ] Repositorio GitHub creado y con código
- [ ] Backend deployado en Render
- [ ] Base de datos PostgreSQL en Render
- [ ] Variables de entorno configuradas
- [ ] Frontend deployado en Vercel
- [ ] CORS configurado correctamente
- [ ] Datos de prueba en la BD
- [ ] Testing completo en URLs en vivo

---

**¡Listo para compartir tu app! 🎉**
