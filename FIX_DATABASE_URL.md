# 🚨 Fix Inmediato: DATABASE_URL en Render

## El Problema
```
ECONNREFUSED 127.0.0.1:5432
```

Significa: **`DATABASE_URL` NO está configurada en Render**, así que intenta conectar a localhost que no existe.

---

## ✅ Solución en 5 Pasos

### 1️⃣ Ve a tu PostgreSQL en Render

1. Abre [render.com](https://render.com)
2. En el dashboard, haz clic sobre tu **PostgreSQL database** (`album-figuritas-db`)
3. Vas a ver una pantalla como esta:

```
Database: album-figuritas-db
Connection String: postgresql://usuario:contraseña@dpg-xxx.render.internal:5432/dbname
```

### 2️⃣ Copia la Connection String

Busca en la página el texto que dice:
- "Internal Database URL" o "Connection String"
- Debe verse así: `postgresql://...@dpg-xxx...`

**Cópialo completamente** (Ctrl+C)

### 3️⃣ Ve al Web Service

1. En Render dashboard, haz clic en tu **Web Service** (`album-figuritas-backend`)
2. Ve a la sección **"Environment"**
3. Debería mostrar algo como:
   ```
   PORT = 5000
   JWT_SECRET = tu_secreto...
   FRONTEND_URL = https://...
   NODE_ENV = production
   ```

### 4️⃣ Agregar DATABASE_URL

En la sección Environment:
1. Clic en **"+ Add Environment Variable"**
2. Completa:
   - **Key:** `DATABASE_URL`
   - **Value:** (pega lo que copiaste del PostgreSQL)
3. Clic **"Save"**

**Debe quedar así:**
```
DATABASE_URL = postgresql://usuario:contraseña@dpg-xxx.render.internal:5432/dbname
```

### 5️⃣ Re-deploy

1. Render debería re-deployar automáticamente
2. Espera 1-2 minutos
3. Ve a **"Logs"** para ver el progreso
4. Deberías ver:
   ```
   📡 Conectando con DATABASE_URL (Render/producción)...
   🔄 Ejecutando migraciones...
   ✅ Tabla usuarios creada/verificada
   ✅ Migraciones completadas correctamente
   ✅ Servidor escuchando en puerto 5000
   ```

---

## 🧪 Verificar que Funciona

### Test 1: Health Check
```
curl https://album-figuritas-backend-xxxx.onrender.com/api/health
```
Debería responder: `{"status":"ok"}`

### Test 2: Registrarse
1. Ve a `https://album-figuritas-kentimbo.vercel.app`
2. Intenta registrarte
3. Si funciona → Success! 🎉

---

## ❌ Si Aún Falla

### Verificar Variables en Render

1. En Web Service → **Environment**
2. Busca `DATABASE_URL` - ¿Está ahí? ✓
3. Su valor - ¿Comienza con `postgresql://`? ✓
4. ¿Tiene `@dpg-` en el host? ✓

### Verificar PostgreSQL

1. Ve a tu PostgreSQL en Render
2. Busca **"Connection"** o **"Psql Shell"**
3. Copia la URL exactamente como está

### Nuclear Option: Copiar desde Render Mismo

1. En PostgreSQL database → **"Connections"**
2. Busca el campo con una URL larga
3. Usa el botón **"Copy"** (no copies manualmente)
4. Pega en DATABASE_URL

---

## 📋 Checklist Final

- [ ] Encontraste la connection string en PostgreSQL
- [ ] Copiaste la URL completa
- [ ] Agregaste DATABASE_URL en Web Service Environment
- [ ] El valor comienza con `postgresql://`
- [ ] Render re-deployó automáticamente
- [ ] Los logs muestran "✅ Servidor escuchando en puerto 5000"
- [ ] Health check devuelve `{"status":"ok"}`
- [ ] Puede registrarse desde frontend

---

## 🆘 Si Nada Funciona

Ejecuta esto en Render **Psql Shell** (en PostgreSQL database):

```sql
\conninfo
SELECT version();
SELECT COUNT(*) FROM usuarios;
```

Esto te dirá:
- ✅ BD conectada
- ✅ PostgreSQL existe
- ✅ Migraciones corrieron

---

**¡Avísame cuando agregues DATABASE_URL!** 🚀
