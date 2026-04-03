# ✅ Pre-Deployment Checklist

## 🔍 Verificaciones Locales

### Backend
- [ ] `npm install` ejecutado sin errores
- [ ] `.env` configurado con DEBUG=true (opcional)
- [ ] `npm start` inicia sin errores
- [ ] Endpoint `/equipos` responde en http://localhost:5000/api/equipos
- [ ] Podés registrarte: POST /auth/register
- [ ] Podés loguarte: POST /auth/login

### Frontend  
- [ ] `npm install` ejecutado sin errores
- [ ] `.env` tiene REACT_APP_API_URL=http://localhost:5000/api
- [ ] `npm start` compila sin errores
- [ ] Página carga en http://localhost:3000
- [ ] Podés registrarte
- [ ] Podés loguarte
- [ ] Ves el álbum con equipos

### Base de Datos
- [ ] PostgreSQL corre localmente
- [ ] Migraciones se ejecutan al iniciar backend
- [ ] Tabla `usuarios` tiene columnas: `sobres_disponibles`, `ultimo_dia_sobre`
- [ ] Tabla `figuritas_usuario` existe

### Integración
- [ ] Frontend conecta a backend (sin CORS errors)
- [ ] Abrir sobre genera 5 figuritas aleatorias
- [ ] Figuritas obtenidas aparecen con borde dorado
- [ ] Solo figuritas obtenidas se pueden pegar
- [ ] Estadísticas se actualizan correctamente
- [ ] Aparece mensaje de error si no hay sobres

---

## 🧹 Limpieza Previa

- [ ] Eliminar archivos temporales (`.DS_Store`, `*.bak`)
- [ ] Sin contraseñas en archivos de código
- [ ] `.gitignore` incluye `.env`, `node_modules/`, `.build/`
- [ ] No hay consoles.log() de debug en código (opcional - borrar si quieres)
- [ ] No hay `console.error()` que se vea al usuario

---

## 📝 Documentación

- [ ] README.md completo y correcto
- [ ] DEPLOYMENT.md listo
- [ ] API_DOCS.md documentado
- [ ] QUICKSTART.md actualizado
- [ ] ENTREGABLE_v1.md confirma features

---

## 🔐 Seguridad

### Backend
- [ ] JWT_SECRET es fuerte (>32 caracteres)
- [ ] NODE_ENV=production en .env de producción
- [ ] CORS restrict a dominio de frontend
- [ ] Password hashmaps con bcrypt ✓ (código ya tiene)
- [ ] No hay credenciales en logs

### Frontend
- [ ] Token JWT no se expone en localStorage console
- [ ] Rutas protegidas con PrivateRoute
- [ ] Errores de auth manejan erróneamente (mostrar página login)

---

## 🐘 Base de Datos (PostgreSQL)

### Local
- [ ] Migraciones crean todas las tablas
- [ ] Seed data puede insertar 8 equipos + 40 jugadores

### Production (después de crear en Render)
- [ ] TABLE usuarios creada
- [ ] TABLE equipos creada
- [ ] TABLE jugadores creada
- [ ] TABLE figuritas_usuario creada
- [ ] Foreign keys configuradas
- [ ] Timezone = America/Argentina/Buenos_Aires

---

## 🚀 Servicios Externos

### GitHub
- [ ] Cuenta creada o existente
- [ ] Repositorio público o privado listo
- [ ] Git configurado localmente (`git config --global user.email`)
- [ ] Código pusheado: `git push origin main`

### Render.com
- [ ] Cuenta creada (sign up con GitHub facilita)
- [ ] Para Backend Web Service:
  - [ ] Conectado a GitHub repo
  - [ ] Build command: `npm install`
  - [ ] Start command: `node server.js`
  - [ ] Environment vars configuradas
  - [ ] PostgreSQL database creada
- [ ] DATABASE_URL generada y guardada

### Vercel
- [ ] Cuenta creada (sign up con GitHub facilita)
- [ ] Frontend importado desde GitHub
- [ ] Root directory: `frontend/`
- [ ] Environment variables configuradas:
  - [ ] REACT_APP_API_URL = URL de Render

---

## 🧪 Testing Post-Deployment

### Primer Acceso
- [ ] Podés registrarte: formulario funciona
- [ ] Validaciones de email (formato correcto?)
- [ ] Validaciones de password (>8 caracteres?)
- [ ] Token se guarda en localStorage

### Funcionalidades Clave
- [ ] Login funciona con múltiples usuarios
- [ ] Ves el álbum con todos los equipos
- [ ] Abrís sobre → 5 figuritas aleatorias
- [ ] Figuritas obtenidas tienen oro
- [ ] Solo figuritas obtenidas se dejan pegar
- [ ] Cambias equipo y las figuritas persistuen
- [ ] Recargas página → todo sigue igual
- [ ] Mañana → aparece nuevo sobre (si fue hoy)

### Performance
- [ ] Página carga en <3 segundos
- [ ] Sin errores 404 en console
- [ ] CORS errors? → check REACT_APP_API_URL

### Mobile
- [ ] Responsive design funciona (max-width 768px)
- [ ] Botones accesibles
- [ ] Sobre modal se ve bien
- [ ] Animaciones suave

---

## 📋 Datos de Prueba

### Test Users Sugeridos
```
1. test.user@example.com / TestPass123!
2. jugador@kentimbo.com / JugadorPass456!  
3. admin@test.com / AdminPass789!
```

### Verificar Datos
- [ ] 8 equipos activos
- [ ] 5 jugadores por equipo (40 total)
- [ ] Cada jugador tiene número y emoji

---

## 🔗 URLs Finales (ejemplo)

```
Frontend:  https://album-figuritas-kentimbo.vercel.app
Backend:   https://album-backend.onrender.com
API:       https://album-backend.onrender.com/api
```

---

## 🎯 Compartir con Testers

### Info a Proporcionar
- [ ] URL de producción
- [ ] Credenciales de prueba (opcionales)
- [ ] Qué probar (funcionalidades)
- [ ] Cómo reportar bugs (email / issue)
- [ ] Plazo de testing

### Feedback Form
```
Reportar en: email o GitHub issues

- Navegador / OS usado
- Qué paso paso a paso
- Resultado esperado
- Resultado observado
- Screenshots si aplica
```

---

## ❌ Common Mistakes

- ❌ Olvidar copiar .env al servidor
- ❌ DATABASE_URL con user/password visible en GitHub
- ❌ REACT_APP_API_URL sin https:// en producción
- ❌ Migraciones no ejecutadas en DB de Render
- ❌ Seed data no ejecutado → sin equipos que ver
- ❌ Node version mismatch (usar 18.x o 20.x)
- ❌ Puerto 5000 ya en uso localmente

---

## 📞 Support

Si algo falla:
1. Checkea archivo `.env`
2. Verifica BD conecta: `psql DATABASE_URL`
3. Lookea logs en Render/Vercel console
4. Ejecuta `npm install` de nuevo
5. Borra `node_modules/` y reinstala

---

**Última actualización:** 2 de Abril, 2026
