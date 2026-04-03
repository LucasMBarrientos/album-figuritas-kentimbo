# 🔍 Guía: Verificar Conexión a BD y Poblar con Datos

## 1️⃣ Verificar Conexión a PostgreSQL

### Opción A: Script Automático (Recomendado)

```bash
cd backend
npm run check-db
```

**Esto mostrará:**
- ✅ Si la conexión funciona
- 📊 Todas las tablas en la BD
- 📈 Cuántos registros hay en cada tabla
- ⚽ Lista de equipos existentes

**Ejemplo de salida exitosa:**
```
🔍 Verificando conexión a PostgreSQL...

✅ Conexión exitosa!
   Hora en BD: 2026-04-02T...

📊 Tablas en BD:
   - equipos
   - usuarios
   - jugadores
   - figuritas_usuario

📈 Registros por tabla:
   📍 Equipos: 17
   👤 Usuarios: 2
   ⚽ Jugadores: 340
   🎴 Figuritas Usuario: 45
```

---

### Opción B: Verificar Manualmente con psql

```bash
# Conectarse
psql postgresql://usuario:contraseña@localhost:5432/figuritas_bd

# Dentro de psql:
\dt                          # Ver todas las tablas
SELECT COUNT(*) FROM equipos;     # Contar equipos
SELECT * FROM equipos LIMIT 5;    # Ver primeros 5 equipos
\q                          # Salir
```

---

## 2️⃣ Poblar BD con Datos del JSON

### Script para Cargar equiposkentimbo.json

```bash
cd backend
npm run seed-json
```

**Esto:**
1. Lee `equiposkentimbo.json`
2. Inserta todos los equipos en tabla `equipos`
3. Inserta todos los jugadores en tabla `jugadores`
4. Muestra progreso en tiempo real
5. Verifica al final cuántos registros se agregaron

**Ejemplo de salida:**
```
🌱 Iniciando seed de base de datos...

📂 Leyendo equiposkentimbo.json
📊 Equipos encontrados: 17

✅ Altardez Verdi-Rojo           (ID: 1)
✅ Asociación Alburgo de Kentucky (ID: 2)
✅ Asociación Alburgo de Maltania (ID: 3)
...

✅ Seed completado:
   📍 Equipos agregados: 17
   ⚽ Jugadores agregados: 340

📊 Estado actual de la BD:
   Total Equipos: 17
   Total Jugadores: 340
```

---

## 3️⃣ Flujo Completo: De Cero a Datos

### 1. Verificar que PostgreSQL corre
```bash
npm run check-db
# Si falla → inicia PostgreSQL
```

### 2. Iniciar Backend (crea tablas automáticamente)
```bash
npm start
# Espera a ver: "✅ Servidor escuchando en puerto 5000"
# Ctrl+C para detener
```

### 3. Cargar datos del JSON
```bash
npm run seed-json
```

### 4. Verificar que todo funciona
```bash
npm run check-db
# Debería mostrar 17 equipos y 340 jugadores
```

---

## 🧪 Testear Manualmente

### Ver datos en la BD

```sql
-- Conéctate a PostgreSQL y ejecuta:

-- Ver equipos
SELECT id, nombre, capacidad, entrenador FROM equipos ORDER BY id;

-- Ver jugadores de un equipo específico
SELECT nombre, numero FROM jugadores WHERE equipo_id = 1 LIMIT 10;

-- Ver cuántos jugadores tiene cada equipo
SELECT e.nombre, COUNT(j.id) as jugadores 
FROM equipos e 
LEFT JOIN jugadores j ON e.id = j.equipo_id 
GROUP BY e.id, e.nombre 
ORDER BY e.nombre;
```

---

## 🔗 Verificar Conexión con Frontend

### 1. Iniciar Backend
```bash
cd backend
npm start
```

### 2. Iniciar Frontend (otra terminal)
```bash
cd frontend
npm start
```

### 3. ProBar en http://localhost:3000
- Registrate
- Loguéate
- Verifica que aparecen todos los equipos
- Abre un sobre para ver que trae jugadores del JSON

---

## ⚠️ Troubleshooting

| Problema | Solución |
|----------|----------|
| `ECONNREFUSED` | PostgreSQL no corre → inicia |
| `database doesn't exist` | Crea BD: `createdb figuritas_bd` |
| `password authentication failed` | Verifica credenciales en .env |
| `No tables found` | Inicia backend: `npm start` |
| `No jugadores` | Ejecuta: `npm run seed-json` |
| `duplicate key value` | Los datos ya están → OK |

---

## 📝 Variables de Entorno (backend/.env)

**Local:**
```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/figuritas_bd
# O:
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=figuritas_bd
```

**Render.com (Producción):**
```
DATABASE_URL=postgresql://user:pass@dpg-xxx.render.internal/figuritas
```

---

## 🎯 Checklist

- [ ] PostgreSQL corre
- [ ] `npm run check-db` funciona
- [ ] Backend inicia sin errores: `npm start`
- [ ] `npm run seed-json` completa exitosamente
- [ ] `npm run check-db` muestra 17 equipos
- [ ] Frontend se conecta a backend
- [ ] Puedes loguear y ver equipos

---

**¡Si todo está verde, tu app está lista!** 🚀
