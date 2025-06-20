import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Accept = 'application/json';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;