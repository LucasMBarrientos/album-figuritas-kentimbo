# 📚 API Documentation

## Overview
API RESTful para gestionar álbum de figuritas con autenticación JWT.

**Base URL:** `http://localhost:5000/api`

**Headers requeridos:**
```
Content-Type: application/json
Authorization: Bearer <token_jwt> (excepto en /auth/*)
```

---

## 🔐 Authentication Endpoints

### Registro
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response 201:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "email": "user@example.com",
    "sobres_disponibles": 2
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response 200:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "email": "user@example.com",
    "sobres_disponibles": 2
  }
}
```

---

## 👤 Usuarios Endpoints

### Obtener Perfil
```
GET /usuarios/perfil
Authorization: Bearer <token>

Response 200:
{
  "id": 1,
  "email": "user@example.com",
  "sobres_disponibles": 2,
  "figuritas_desbloqueadas": 12,
  "total_figuritas": 40
}
```

### Obtener Sobres
```
GET /usuarios/sobres
Authorization: Bearer <token>

Response 200:
{
  "sobres_disponibles": 2,
  "ultimo_dia_sobre": "2026-04-02"
}

// Si es nuevo día, regenera automáticamente
```

### Abrir Sobre
```
POST /usuarios/abrir-sobre
Authorization: Bearer <token>

Response 200:
{
  "julio": [
    { id: 5, nombre: "Kobe Bryant", numero: 24 },
    { id: 8, nombre: "Shaquille O'Neal", numero: 33 },
    { id: 12, nombre: "Michael Jordan", numero: 23 },
    { id: 15, nombre: "Scottie Pippen", numero: 33 },
    { id: 20, nombre: "Dennis Rodman", numero: 91 }
  ],
  "sobres_restantes": 1
}
```

---

## 🏀 Equipos Endpoints

### Listar Todos los Equipos
```
GET /equipos
(sin autenticación)

Response 200:
[
  {
    "id": 1,
    "nombre": "Los Angeles Lakers",
    "emoji": "🟪",
    "ciudad": "Los Angeles"
  },
  ...
]
```

---

## 🎴 Figuritas Endpoints

### Obtener Todas las Figuritas
```
GET /figuritas
Authorization: Bearer <token>

Response 200:
[
  {
    "id": 1,
    "nombre": "LeBron James",
    "numero": 23,
    "equipo_id": 1,
    "equipo": "Los Angeles Lakers",
    "emoji": "🟪",
    "obtenido": true,
    "pegado": true
  },
  ...
]
```

### Obtener Estadísticas
```
GET /figuritas/stats
Authorization: Bearer <token>

Response 200:
{
  "total": 40,
  "obtenidas": 12,
  "faltantes": 28,
  "pegadas": 10,
  "sin_pegar": 2
}
```

### Pegar Figurita
```
POST /figuritas/pegar/:id
Authorization: Bearer <token>

Response 200:
{
  "id": 1,
  "pegado": true,
  "mensaje": "Figurita pegada exitosamente"
}
```

### Quitar (Despegar) Figurita
```
POST /figuritas/quitar/:id
Authorization: Bearer <token>

Response 200:
{
  "id": 1,
  "pegado": false,
  "mensaje": "Figurita removida del álbum"
}
```

---

## 🔀 Rutas por Equipo

### Obtener Figuritas por Equipo
```
GET /figuritas/equipo/:id
Authorization: Bearer <token>

Response 200:
[
  {
    "id": 1,
    "nombre": "LeBron James",
    "numero": 23,
    "equipo_id": 1,
    "obtenido": true,
    "pegado": true
  },
  ...
]
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "error": "Email y contraseña requeridos"
}
```

### 401 Unauthorized
```json
{
  "error": "Token inválido o expirado"
}
```

### 403 Forbidden
```json
{
  "error": "No tienes sobre disponible"
}
```

### 404 Not Found
```json
{
  "error": "Recurso no encontrado"
}
```

### 500 Server Error
```json
{
  "error": "Error interno del servidor"
}
```

---

## 🧪 Testing con cURL

```bash
# Registro
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Obtener perfil (reemplazar TOKEN)
curl -X GET http://localhost:5000/api/usuarios/perfil \
  -H "Authorization: Bearer TOKEN"

# Obtener equipos
curl -X GET http://localhost:5000/api/equipos

# Abrir sobre (reemplazar TOKEN)
curl -X POST http://localhost:5000/api/usuarios/abrir-sobre \
  -H "Authorization: Bearer TOKEN"
```

---

## 📊 Rate Limits
Actualmente no hay rate limiting implementado. Para producción, considerar agregar.

---

## 🔄 Flow Típico de Usuario

1. **POST /auth/register** → Crear cuenta (2 sobres iniciales)
2. **GET /equipos** → Ver lista de equipos
3. **GET /figuritas** → Ver todas las figuritas
4. **POST /usuarios/abrir-sobre** → Abrir un sobre (5 figuritas aleatorias)
5. **POST /figuritas/pegar/:id** → Pegar una figurita en el álbum
6. **GET /usuarios/sobres** → Verificar si hay nuevos sobres (próximo día)

---

## 🚀 Deployment

En producción, reemplazar `http://localhost:5000/api` con URL de Render.com

---

**Versión:** 1.0
**Última actualización:** 2 de Abril, 2026
