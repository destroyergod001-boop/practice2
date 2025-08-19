// src/Core/api/apiClient.ts
import axios from 'axios';
import { apiBase } from '../../../env'; // adjust path to your env file

export const apiClient = axios.create({
  baseURL: apiBase || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  r => r,
  err => {
    // global error logging can go here
    return Promise.reject(err);
  }
);
