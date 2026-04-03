# 🏆 Álbum de Figuritas - Instrucciones de Instalación

## Prerequisitos

Necesitas tener instalado:
- **Node.js** (v16+): https://nodejs.org/
- **PostgreSQL**: https://www.postgresql.org/download/

## Paso 1: Instalar PostgreSQL

### En Windows:
1. Descarga e instala PostgreSQL desde https://www.postgresql.org/download/windows/
2. Durante la instalación:
   - Contraseña de postgres: `postgres` (o la que prefieras)
   - Puerto: `5432` (por defecto)
3. Anota la contraseña que uses

### Crear la Base de Datos:

Abre **pgAdmin** (incluido con PostgreSQL):
```sql
CREATE DATABASE album_figuritas;
```

O usa la línea de comandos:
```bash
psql -U postgres -c "CREATE DATABASE album_figuritas;"
```

## Paso 2: Instalar Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Verificar que package.json tenga node:true
# Ejecutar el servidor
npm start
```

El backend estará en: `http://localhost:5000`

## Paso 3: Instalar Frontend

```bash
# En otra terminal, navegar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar React
npm start
```

El frontend estará en: `http://localhost:3000`

## Variables de Entorno

### Backend (.env):
```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=album_figuritas
DB_USER=postgres
DB_PASSWORD=postgres  # Cambiar según tu instalación
JWT_SECRET=tu_clave_secreta_super_segura_aqui_cambiar_en_produccion
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error de conexión a PostgreSQL
1. Verifica que PostgreSQL está corriendo
2. Comprueba usuario/contraseña en .env
3. Crea la base de datos:
   ```bash
   psql -U postgres -c "CREATE DATABASE album_figuritas;"
   ```

### Puerto 5000/3000 ya en uso
```bash
# Cambiar puerto en .env del backend (PORT=5001)
# O encontrar qué proceso usa el puerto:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Estructura del Proyecto

```
album figuritas/
├── backend/
│   ├── config/database.js       # Conexión BD
│   ├── routes/
│   │   ├── auth.js              # Login/Register
│   │   ├── figuritas.js         # Figuritas
│   │   └── usuarios.js          # Perfil
│   ├── middleware/auth.js       # JWT Verificación
│   ├── server.js                # Servidor principal
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/               # Login, Register, Album
│   │   ├── components/          # PrivateRoute
│   │   ├── context/             # AuthContext
│   │   ├── services/            # API calls
│   │   ├── App.js               # Ruteo
│   │   └── index.js
│   └── package.json
└── README.md

```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Figuritas
- `GET /api/figuritas` - Obtener todas las figuritas del usuario
- `GET /api/figuritas/stats` - Estadísticas
- `POST /api/figuritas/:id/pegar` - Pegar figurita
- `POST /api/figuritas/:id/quitar` - Quitar figurita

### Usuarios
- `GET /api/usuarios/perfil` - Obtener perfil

## Próximos Pasos

1. Agregar datos de equipos/jugadores a la BD
2. Implementar sistema de sobres
3. Mejorar interfaz del álbum
4. Agregar más estadísticas
5. Deploy en Render + Vercel

¡Listo! El proyecto está listo para desarrollar. 🚀
