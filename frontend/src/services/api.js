import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (nombre, email, password) =>
    apiClient.post('/auth/register', { nombre, email, password }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password })
};

// Figuritas API
export const figuritasAPI = {
  obtenerTodas: () => apiClient.get('/figuritas'),
  obtenerStats: () => apiClient.get('/figuritas/stats'),
  pegarFiguritas: (figuritaId) => apiClient.post(`/figuritas/${figuritaId}/pegar`),
  quitarFiguritas: (figuritaId) => apiClient.post(`/figuritas/${figuritaId}/quitar`)
};

// Usuarios API
export const usuariosAPI = {
  obtenerPerfil: () => apiClient.get('/usuarios/perfil'),
  obtenerSobres: () => apiClient.get('/usuarios/sobres'),
  abrirSobre: () => apiClient.post('/usuarios/abrir-sobre')
};

export default apiClient;
