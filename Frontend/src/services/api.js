import axios from 'axios';

// Default API URL
const DEFAULT_API_URL = 'http://localhost:5000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || DEFAULT_API_URL) ,
});

// Request interceptor for adding token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;