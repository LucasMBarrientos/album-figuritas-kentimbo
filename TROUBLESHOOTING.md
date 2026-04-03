# 🔧 Troubleshooting Guide

## Backend Issues

### ❌ "Error: Cannot find module 'express'"
**Causa:** Módulos no instalados
```bash
cd backend
npm install
```

---

### ❌ "Error: connect ECONNREFUSED 127.0.0.1:5432"
**Causa:** PostgreSQL no está corriendo
- **Windows:** Abre PostgreSQL desde Services o:
  ```bash
  pg_ctl -D "C:\Program Files\PostgreSQL\14\data" start
  ```
- **Mac:** 
  ```bash
  brew services start postgresql
  ```
- **Linux:** 
  ```bash
  sudo service postgresql start
  ```

---

### ❌ "Error: Database 'figuritas_bd' does not exist"
**Causa:** BD no fue creada
```sql
-- En psql:
CREATE DATABASE figuritas_bd;
```

O server auto-crea al iniciarse (ver migrations en server.js)

---

### ❌ "Port 5000 already in use"
**Causa:** Otro proceso usa el puerto
```bash
# Encontrar quién usa puerto 5000:
lsof -i :5000  # macOS/Linux

# O cambiar puerto en .env:
PORT=5001
```

---

### ❌ "JWT malformed" o "Invalid token"
**Causa:** 
1. Token expirado
2. JWT_SECRET diferente en backend
3. Token corrupto

**Solución:**
- Loguéate de nuevo para generar token nuevo
- Verifica JWT_SECRET en .env
- Borra localStorage: `localStorage.clear()` en console

---

### ❌ "CORS error: Access to XMLHttpRequest blocked"
**Causa:** Frontend y backend en dominios diferentes

**Solución en backend (`server.js`):**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
```

O para permitir todo (⚠️ solo desarrollo):
```javascript
app.use(cors());
```

---

### ❌ "req.userId is undefined"
**Causa:** Middleware de autenticación no ejecutó

**Solución:** Verifica que las rutas tengan `authenticateToken`:
```javascript
router.get('/perfil', authenticateToken, (req, res) => {
  // req.userId debe existir
});
```

---

### ❌ "Sobres no se regeneran"
**Causa:** Para debugging...
```javascript
// En usuarios.js GET /sobres, agrega logs:
console.log('ultimoDia:', ultimoDiaGuardado);
console.log('hoy:', hoyArgentina);
console.log('necesita regen:', ultimoDiaGuardado < hoyArgentina);
```

Verifica que:
- Timezone sea 'America/Argentina/Buenos_Aires'
- ultimo_dia_sobre se guarda como DATE (no TIMESTAMP)
- Base de datos tiene la columna sobres_disponibles

---

### ❌ "Seed script falla"
```bash
cd backend
node seed-deploy.js
```

Si falla:
1. ¿PostgreSQL corre?
2. ¿DATABASE_URL correcto en .env?
3. ¿Migraciones ejecutadas? (server.js corre antes)

---

### ❌ "Cannot read property 'rows' of undefined"
**Causa:** Pool de BD no conectó

```javascript
// Verificar en database.js:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Test connection:
pool.query('SELECT 1', (err, res) => {
  console.log(err ? 'ERROR' : 'Conectado');
});
```

---

## Frontend Issues

### ❌ "React is not defined"
**Causa:** Falta import
```javascript
import React from 'react';

// O en más nuevas versiones, no necesitas si usas hooks:
import { useState } from 'react';
```

---

### ❌ "REACT_APP_* variable is undefined"
**Causa:** Variables de entorno no se actualizaron

```bash
# Solución: Matar servidor y reiniciar
npm start
```

O verificar `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

### ❌ "Cannot read property 'token' of undefined"
**Causa:** Response del backend diferente a lo esperado

```javascript
// Debug en api.js:
const response = await axios.post(`${API_URL}/auth/login`, { email, password });
console.log('Response:', response.data); // Verifica estructura
return response.data.token; // ¿Existe?
```

---

### ❌ "API call returns 404"
**Causa:** Endpoint no existe o URL es incorrecta

1. Verifica REACT_APP_API_URL: `http://localhost:5000/api`
2. Verifica endpoint existe en backend
3. Verifica ruta: `/equipos` no `/get-equipos`

```javascript
// Debug:
console.log('API URL:', process.env.REACT_APP_API_URL);
```

---

### ❌ "Tokens expiran rápido"
**Causa:** JWT_SECRET muy corto o tokens configurados para expirar

En `auth.js` backend:
```javascript
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' } // Cambiar si necesitas otro tiempo
);
```

---

### ❌ "Figuritas no persisten después de refrescar"
**Causa:** Frontend guarda en estado local, no en BD

**Es correcto** - Las figuritas se guardan en tabla `figuritas_usuario`

Si no persisten:
1. ¿Llamaste a `pegarFiguritas()`?
2. ¿El endpoint devuelve 200?
3. ¿Token es válido?

---

### ❌ "Modal de sobre no cierra"
**Causa:** Estado `showPackModal` no se actualiza

```javascript
// Verificar en Album.js:
setShowPackModal(false); // Debe ejecutarse
```

O falta click handler:
```jsx
<button onClick={() => setShowPackModal(false)}>Cerrar</button>
```

---

### ❌ "Responsive no funciona en mobile"
**Causa:** Falta viewport meta tag o media query

En `public/index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

En `Album.css`:
```css
@media (max-width: 768px) {
  /* Estilos mobile */
}
```

---

### ❌ "Estilos no se aplican"
**Causa:** CSS no importado o especificidad baja

En `Album.js`:
```javascript
import './Album.css'; // ¿Está?
```

En CSS, usar `!important` si necesitas (no recomendado):
```css
.album-page {
  background: linear-gradient(...) !important;
}
```

---

### ❌ "useAuth hook error: Cannot read property 'user' of undefined"
**Causa:** AuthContext no está proveyendo valores

En `App.js`:
```javascript
<AuthProvider>
  <BrowserRouter>
    <Routes>
      {/* rutas */}
    </Routes>
  </BrowserRouter>
</AuthProvider>
```

O en `AuthContext.js`:
```javascript
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe estar dentro de AuthProvider');
  return context;
};
```

---

## Full Stack Issues

### ❌ "Puedo loguearme pero no veo datos"
**Verificar:**
1. ✅ Token guardado en localStorage?
   ```javascript
   // En console:
   localStorage.getItem('token')
   ```

2. ✅ Backend devuelve datos?
   ```bash
   # En terminal:
   curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/figuritas
   ```

3. ✅ Frontend está authenticado?
   ```javascript
   // En Album.js:
   console.log('User:', user); // Debe mostrar datos
   ```

---

### ❌ "Algunos equipos no aparecen"
**Causa:** Seed data incompleto

```bash
cd backend
node seed-deploy.js
```

O verificar BD:
```sql
SELECT COUNT(*) FROM equipos;
# Debe ser 8
```

---

### ❌ "Error al pegar figurita"
**Verificar:**
```javascript
// En Album.js:
console.log('ID a pegar:', id);
console.log('Obtenidos:', obtainedPlayers);

// En backend POST /pegar/:id
console.log('req.params.id:', req.params.id);
```

---

### ❌ "Abrí sobre pero no veo nada"
**Verificar:**
```javascript
// En Album.js:
console.log('Pack:', packCards);
console.log('Modal visible:', showPackModal);
```

Si packCards está vacío:
- ¿Tenés sobres disponibles?
- ¿Backend devolvió 5 jugadores?

---

## Debugging Tips

### Backend
```bash
# Ver todos los logs:
npm start 2>&1 | tee backend.log

# Modo verbose:
DEBUG=* npm start
```

### Frontend
```javascript
// En console:
localStorage.team_page // Ver qué equipo estás viendo
JSON.parse(localStorage.getItem('token')) // Ver token
```

### Database
```sql
-- Ver usuarios:
SELECT * FROM usuarios;

-- Ver figuritas de un usuario:
SELECT * FROM figuritas_usuario WHERE usuario_id = 1;

-- Ver sobres:
SELECT id, email, sobres_disponibles, ultimo_dia_sobre FROM usuarios;
```

---

## Performance Issues

### ❌ "Page carga lento"
1. Abre DevTools (F12) → Network
2. ¿Algún request >1s?
3. ¿API devuelve en <500ms?

Si es lento en frontend:
- Usa `useMemo()` para memoizar figuritasPorEquipo
- Evita re-renders: `React.memo()`
- Lazy loading: `React.lazy()` + `Suspense`

### ❌ "Memory leak"
Verifica cleanup en useEffect:
```javascript
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('resize', handler);
  
  return () => window.removeEventListener('resize', handler); // IMPORTANTE
}, []);
```

---

## Production Issues

### ❌ "Render dice 'Build failed'"
1. Check logs en Render dashboard
2. Verifica `npm start` funciona localmente
3. ¿node_modules en .gitignore?
4. ¿npm install en build command?

---

### ❌ "Vercel dice 'Function error'"
1. Check logs en Vercel
2. ¿REACT_APP_API_URL está seteado?
3. ¿Build completa sin errores?: `npm run build`

---

### ❌ "BD de Render no conecta"
1. Copia DATABASE_URL correcto
2. Testing connection:
   ```bash
   psql "DATABASE_URL"
   ```
3. Si falla, recrear DB en Render

---

## When All Else Fails

```bash
# Reset completo (nuclear option):

### Backend:
rm -rf node_modules package-lock.json
npm install
rm .env
# Crear .env nuevo con valores correctos
npm start

### Frontend:
rm -rf node_modules package-lock.json
npm install
rm .env
# Crear .env nuevo
npm start

### Database:
# Borrar y recrear BD
dropdb figuritas_bd
createdb figuritas_bd
# Server crea migraciones automáticamente
```

---

## Getting Help

1. **Verifica logs completos** - Scroll arriba para ver contexto
2. **Google el error exacto** - Probablemente alguien menos lo tuvo
3. **Checkea Stack Overflow** - Node + React + PostgreSQL
4. **GitHub Issues** - De los paquetes que usas

---

**Last Updated:** 2 de Abril, 2026
