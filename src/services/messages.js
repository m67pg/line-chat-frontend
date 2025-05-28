import axios from '../api/axios';

export const getMessages = async () => {
  const res = await axios.get('/api/messages');
  return res.data;
};