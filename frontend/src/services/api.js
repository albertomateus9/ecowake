import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ecowake.online/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logs
api.interceptors.request.use((config) => {
  console.log('🔵 API Request:', config.method.toUpperCase(), config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

// Endpoints
export const shipsAPI = {
  getAll: () => api.get('/ships'),
  getById: (id) => api.get(`/ships/${id}`),
};

export default api;
