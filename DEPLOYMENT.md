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
3. Copia la connection string (será algo como `postgresql://user:pass@host/db`)

### 2.4 Conectar BD al Web Service

⚠️ **IMPORTANTE: Render conecta automáticamente la BD al Web Service!!**

En tu Web Service `album-figuritas-backend`, ve a:
- **Environment** 
- Busca `DATABASE_URL` (debería estar ahí automáticamente)
- Si **NO está**, cópiala del PostgreSQL y agrégala manualmente

### 2.5 Variables de Entorno

En el Web Service, verifica que tengas:

```
DATABASE_URL=postgresql://usuario:contraseña@host:5432/database
PORT=5000
JWT_SECRET=tu_secreto_super_mega_seguro_123456789
JWT_EXPIRE=7d
FRONTEND_URL=https://album-figuritas-kentimbo.vercel.app
NODE_ENV=production
```

💡 **Nota:** `DATABASE_URL` **se genera automáticamente** cuando conectas PostgreSQL. Si no la ves, cópiala manualmente desde la BD.

### 2.6 Deploy

1. Haz clic en "Create Web Service"
2. Espera a que compile (5-10 min)
3. En **Logs**, deberías ver:
   ```
   📡 Conectando con DATABASE_URL (Render)...
   🔄 Ejecutando migraciones...
   ✅ Tabla usuarios creada/verificada
   ✅ Tabla equipos creada/verificada
   ✅ Migraciones completadas correctamente
   ✅ Servidor escuchando en puerto 5000
   ```
4. Verás un URL como: `https://album-figuritas-backend-xxxx.onrender.com`
5. 📌 **Guarda este URL**

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

### Opción A: Usar Render Shell

1. En Render, ve a tu PostgreSQL database
2. Clic en "Connect" → "Psql Shell"
3. Ejecuta:
```sql
-- Ver si hay equipo
SELECT COUNT(*) FROM equipos;

-- Si es 0, ejecuta el SQL de setup (ver DATABASE_GUIDE.md)
```

### Opción B: Conectar Localmente y Ejecutar Seed

```bash
cd backend

# Actualizar .env con DATABASE_URL de Render
# DATABASE_URL=postgresql://user:pass@dpg-xxx.render.internal/db

npm run seed-json
```

### Opción C: Usar Psql Remotamente

```bash
psql "postgresql://usuario:contraseña@host:5432/database"

# Dentro de psql, ejecuta el SQL de los equipos
SELECT COUNT(*) FROM equipos;
```

---

**¡Las migraciones crearán las tablas automáticamente!**

Ver `DATABASE_GUIDE.md` para más detalles.

---

## 🧪 Testear la Aplicación

1. Ve a `https://album-figuritas-kentimbo.vercel.app`
2. Registrate con un email de prueba
3. ¡Comienza a coleccionar!

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| "Cannot read package.json: ENOENT" | RenderSettings, establece Root Directory: `backend` |
| Error 500 al registrarse | Verifica que DATABASE_URL está en Environment Variables de Render |
| "Cannot GET /api/figuritas" | Backend: Verifica Render logs. Frontend: Verifica REACT_APP_API_URL |
| CORS error | En Vercel, REACT_APP_API_URL debe tener `/api`: `https://backend.onrender.com/api` |
| "relation 'usuarios' does not exist" | Migraciones no corrieron. Chequea logs de Render |
| Logs vacíos en Render | Deploy falló. Haz clic en "Requeue deployment" |

### Verificar Conexión a BD

```bash
# En Render, Psql Shell:
\conninfo                    # Ver conexión
SELECT version();            # Verificar BD conectada
SELECT COUNT(*) FROM usuarios; # Ver registros
```

---

## 📱 Compartir Link

Una vez todo funcione, comparte este link:
```
https://album-figuritas-kentimbo.vercel.app
```

La gente podrá acceder directamente, ¡sin instalar nada!

---

## ⚠️ CHECKLIST Render Backend

- [ ] Web Service creado con Root Directory: `backend`
- [ ] PostgreSQL database creado
- [ ] DATABASE_URL en Environment Variables ✅ **CRÍTICO**
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Deploy completado sin errores
- [ ] Logs muestran: "✅ Servidor escuchando en puerto 5000"

---

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
