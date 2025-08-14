import axios from 'axios';

// Default API URL
const DEFAULT_API_URL = 'http://localhost:5000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || DEFAULT_API_URL) ,
});
export default api;