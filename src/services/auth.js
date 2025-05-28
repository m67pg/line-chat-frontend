import axios from '../api/axios';

await axios.get('/sanctum/csrf-cookie');

export const login = async (email, password) => {
  const res = await axios.post('/api/login', { email, password });

  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user_id', res.data.user.id);
};