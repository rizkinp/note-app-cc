// src/composables/useAuth.js
import { ref } from 'vue';
import api from '../services/api';
import router from '@/router';

export function useAuth() {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);
  const error = ref(null);
  const isLoading = ref(false);

  // Login
  const login = async (email, password) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await api.post('/login', { email, password });
      console.log('Login Response:', response.data);
      token.value = response.data.data.token;
      console.log('Token:', token.value);
      localStorage.setItem('token', token.value);
      user.value = response.data.user;
      isLoading.value = false;
      return response.data;
    } catch (err) {
      isLoading.value = false;
      error.value = err.response?.data?.message || 'Login failed';
      throw error.value;
    }
  };

  // Register
  const register = async (username, email, password) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await api.post('/register', { username, email, password });
      return response.data;
    } catch (err) {
      isLoading.value = false;
      error.value = err.response?.data?.message || 'Registration failed';
      throw error.value;
    }
  };

  // Logout
  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    router.push('/login')
  };
  const isAuthenticated = () => !!token.value;

  return {
    user,
    token,
    error,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
  };
}
