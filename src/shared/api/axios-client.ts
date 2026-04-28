import type { ApiError } from '@shared/types';
import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jc-balance-api.onrender.com/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use((response) => response
  , (error: AxiosError<ApiError>) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    const fallbackError: ApiError = {
      path: 'unknown',
      error: 'Internal Error',
      message: 'No se pudo conectar con el servidor',
      timestamp: new Date().toISOString(),
      status: error.status || 500
    };

    return Promise.reject(fallbackError);
  });