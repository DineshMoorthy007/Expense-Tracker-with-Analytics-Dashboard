import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { clearToken, getToken } from '@/lib/auth';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((request) => {
  const token = getToken();

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }

  return request;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken();
      window.dispatchEvent(new Event('expense-tracker:logout'));
    }

    return Promise.reject(error);
  },
);