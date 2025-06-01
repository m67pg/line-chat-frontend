import axios from '../api/axios';

export const logout = async () => {
  await axios.post('/api/logout');

  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
};