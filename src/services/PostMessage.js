import axios from '../api/axios';

export const postMessage = async (text) => {
  const res = await axios.post('/api/messages', { text });
  return res.data;
};