// src/composables/useCategory.js
import { ref } from 'vue';
import api from '../services/api';

export function useCategory() {
  const categories = ref([]);
  const category = ref(null);
  const error = ref(null);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/category');
      categories.value = response.data.data;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchCategoryById = async (id) => {
    try {
      const response = await api.get(`/category/${id}`);
      category.value = response.data.data;
    } catch (err) {
      error.value = err;
    }
  };

  const createCategory = async (data) => {
    try {
      await api.post('/category', data);
      fetchCategories();
    } catch (err) {
      error.value = err;
    }
  };

  const updateCategory = async (id, data) => {
    try {
      await api.put(`/category/${id}`, data);
      fetchCategories();
    } catch (err) {
      error.value = err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/category/${id}`);
      fetchCategories();
    } catch (err) {
      error.value = err;
    }
  };

  return {
    categories,
    category,
    error,
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
