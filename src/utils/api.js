// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use(config => {
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, err => Promise.reject(err));

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // optional: clear storage + redirect
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;