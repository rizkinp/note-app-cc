// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ganti dengan base URL API yang sesuai
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
