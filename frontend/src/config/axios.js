import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // Handle global errors here (e.g. 401 refresh token logic)
    return Promise.reject(error);
  }
);

export default api;
