// src/composables/useNote.js
import { ref } from 'vue';
import api from '../services/api';

export function useNote() {
  const notes = ref([]);
  const note = ref(null);
  const error = ref(null);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      notes.value = response.data.data.notes;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchNoteById = async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      note.value = response.data.data;
    } catch (err) {
      error.value = err;
    }
  };

  const searchNotes = async (query) => {
    try {
      const response = await api.get(`/notes/q`, { params: { q: query } });
      notes.value = response.data.data;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchNotesByCategory = async (categoryId) => {
    try {
      const response = await api.get(`/notes/category/${categoryId}`);
      notes.value = response.data.data;
    } catch (err) {
      error.value = err;
    }
  };

  const createNote = async (data) => {
    try {
      // Kirim data dengan categoryId
      await api.post('/notes', { ...data, categoryId: data.categoryId });
      fetchNotes();
    } catch (err) {
      error.value = err;
    }
  };

  const updateNote = async (id, data) => {
    try {
      await api.put(`/notes/${id}`, data);
      console.log(data);
      fetchNotes();
    } catch (err) {
      error.value = err;

    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      error.value = err;
      console.log(err);
    }
  };

  const pinNote = async (id) => {
    try {
      await api.put(`/notes/${id}/pin`);
      fetchNotes();
    } catch (err) {
      error.value = err;
    }
  };

  const archiveNote = async (id) => {
    try {
      await api.put(`/notes/${id}/archive`);
      fetchNotes();
    } catch (err) {
      error.value = err;
    }
  };

  return {
    notes,
    note,
    error,
    fetchNotes,
    fetchNoteById,
    searchNotes,
    fetchNotesByCategory,
    createNote,
    updateNote,
    deleteNote,
    pinNote,
    archiveNote,
  };
}
