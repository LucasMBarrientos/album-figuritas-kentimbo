# 🏀 Álbum Figuritas Kentimbo

App interactiva para coleccionar figuritas de baloncesto con sistema de sobres.

## 🚀 Características

- 📱 Responsive (Desktop & Mobile)
- 🎁 Sistema de sobres (5 jugadores aleatorios)
- 🏆 Colección de figuritas por equipo
- 👤 Autenticación de usuarios
- 📊 Estadísticas de colección
- ⏰ Regeneración de sobres a las 00:00 ART

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Axios
- CSS3 (Responsive)

**Backend:**
- Node.js + Express
- PostgreSQL
- JWT Authentication
- bcryptjs

## 📦 Instalación Local

### Requisitos
- Node.js 18+
- PostgreSQL 14+
- Git

### Setup Backend

```bash
cd backend
npm install

# Crear archivo .env
cat > .env << EOF
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=album_figuritas
DB_USER=postgres
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu_jwt_secreto_super_seguro_123456
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
EOF

# Ejecutar servidor
npm run dev
```

### Setup Frontend

```bash
cd frontend
npm install

# Crear archivo .env
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF

# Ejecutar en desarrollo
npm start
```

## 🌐 Deployment

### Backend en Render.com

1. Ir a [render.com](https://render.com) y crear cuenta
2. Conectar repositorio GitHub
3. Crear "New Web Service"
4. Configurar:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Agregar variables de entorno (Environment)
6. PostgreSQL se puede crear desde Render también

### Frontend en Vercel

1. Ir a [vercel.com](https://vercel.com) y crear cuenta
2. Importar repositorio GitHub
3. Configurar:
   - **Framework:** React
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Agregar variable de entorno:
   - `REACT_APP_API_URL=<URL_DEL_BACKEND_EN_RENDER>`

## 📝 Variables de Entorno

### Backend (.env)
```
PORT=5000
DB_HOST=hostname
DB_PORT=5432
DB_NAME=album_figuritas
DB_USER=user
DB_PASSWORD=password
JWT_SECRET=super_secret_key_muy_seguro
JWT_EXPIRE=7d
FRONTEND_URL=https://tu-frontend.vercel.app
```

### Frontend (.env)
```
REACT_APP_API_URL=https://tu-backend.onrender.com/api
```

## 🗄️ Base de Datos

Crear base de datos con las siguientes tablas:

```sql
-- Usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  sobres_disponibles INTEGER DEFAULT 2,
  ultimo_dia_sobre DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Equipos
CREATE TABLE equipos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  emoji VARCHAR(10),
  color VARCHAR(7)
);

-- Jugadores
CREATE TABLE jugadores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  numero_camiseta INTEGER,
  posicion VARCHAR(50),
  equipo_id INTEGER REFERENCES equipos(id),
  avatar_emoji VARCHAR(10),
  altura VARCHAR(10),
  edad INTEGER,
  pie VARCHAR(10),
  valoracion DECIMAL(3,1),
  foto VARCHAR(255)
);

-- Figuritas del usuario
CREATE TABLE figuritas_usuario (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  jugador_id INTEGER REFERENCES jugadores(id),
  pegada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(usuario_id, jugador_id)
);
```

## 📖 Uso

1. Registrarse con email/contraseña
2. Recibir 2 sobres iniciales
3. Hacer clic en 📦 para abrir sobre
4. Cada jugador obtenido aparece con borde dorado
5. Hacer clic en jugadores dorados para pegarlos al álbum
6. Nuevo sobre cada día a las 00:00 ART

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

## 📄 Licencia

Proyecto personal - Uso libre para testing

---

**Desarrollado con ❤️ para coleccionar figuritas**
