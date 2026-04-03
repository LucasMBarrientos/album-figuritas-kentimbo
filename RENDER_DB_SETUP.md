# 🔧 Conectar PostgreSQL a Web Service en Render

## El Problema
Cuando creas un PostgreSQL database en Render, no se conecta automáticamente al Web Service. Necesitas vincularlos manualmente.

## Paso a Paso

### 1️⃣ Obtener DATABASE_URL del PostgreSQL

1. En Render dashboard, ve a tu database PostgreSQL `album-figuritas-db`
2. Copia la sección "Internal Database URL" (o "External Database URL")
3. Debería verse así:
   ```
   postgresql://username:password@hostname:5432/dbname
   ```

### 2️⃣ Agregar a Web Service

1. Ve a tu Web Service `album-figuritas-backend`
2. "Environment" → "Add Environment Variable"
3. Agrega:
   ```
   Variable:  DATABASE_URL
   Value:     postgresql://username:password@hostname:5432/dbname
   ```
4. Clic "Save"
5. Render re-deployará automáticamente

### 3️⃣ Verificar Conexión

Cuando se redeploy, verifica en "Logs":
```
[backend] Connected to PostgreSQL ✅
[backend] Migrations completed ✅
```

---

## ⚠️ Diferencia de URLs

- **Internal URL:** Úsala siempre (más rápido dentro de Render)
- **External URL:** Solo si conectas desde algo externo (ej: pgAdmin)

---

## Si Aún Falla...

```sql
-- Abre PostgreSQL cliente (psql) y verifica:
\conninfo  -- Muestra conexión actual
SELECT version();  -- Verifica que esté conectado
```

O en Render, revisa logs buscando:
- `ECONNREFUSED` = No puede conectar
- `ENOTFOUND` = Hostname incorrecto
- `Error password auth failed` = Credenciales incorrectas
