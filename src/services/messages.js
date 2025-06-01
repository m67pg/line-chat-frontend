import axios from '../api/axios';

export const getMessages = async () => {
  try {
    const res = await axios.get('/api/messages');
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.warn('401 Unauthorized - リダイレクトします');
      window.location.href = '/';
    } else {
      console.error('受信エラー', error);
    }
  }

};
