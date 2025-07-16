import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dallas-stars-pickems-27161.nodechef.com/api',
});

// Intercept every request to add Authorization header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
