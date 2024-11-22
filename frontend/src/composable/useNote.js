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
      error.value = `Error fetching notes: ${err.message || err}`;
    }
  };

  const fetchNoteById = async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      note.value = response.data.data;
    } catch (err) {
      error.value = `Error fetching note by ID: ${err.message || err}`;
    }
  };

  const fetchNotesByIsArchived = async () => {
    try {
      const response = await api.get('/notes/archived');
      notes.value = response.data.data;
    } catch (err) {
      error.value = `Error fetching notes by isArchived: ${err.message || err}`;
    }
  };

  // Search notes with filters
  const dataFilter = async ({ query = '', sortOrder = '', dateFilter = '' } = {}) => {
    try {
      const params = {};

      if (sortOrder) {
        params.sortOrder = sortOrder;  // If sortOrder is provided, use it
      }

      if (dateFilter) {
        params.dateFilter = dateFilter;  // If dateFilter is provided, use it
      }

      if (query) {
        params.q = query;
      }

      const response = await api.get('/notes/q', { params });
      notes.value = response.data.data;
    } catch (err) {
      error.value = `Error searching notes: ${err.message || err}`;
    }
  };

  const fetchNotesByCategory = async (categoryId) => {
    try {
      const response = await api.get(`/notes/category/${categoryId}`);
      notes.value = response.data.data;
    } catch (err) {
      error.value = `Error fetching notes by category: ${err.message || err}`;
    }
  };

  const createNote = async (data) => {
    try {
      // Pastikan categoryId ada di data
      if (data.categoryId) {
        await api.post('/notes', { ...data });
        fetchNotes();
      } else {
        error.value = 'Category ID is required to create a note';
      }
    } catch (err) {
      error.value = `Error creating note: ${err.message || err}`;
    }
  };

  const updateNote = async (id, data) => {
    try {
      await api.put(`/notes/${id}`, data);
      fetchNotes();
    } catch (err) {
      error.value = `Error updating note: ${err.message || err}`;
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      error.value = `Error deleting note: ${err.message || err}`;
    }
  };

  const pinNote = async (id) => {
    try {
      await api.put(`/notes/${id}/pin`);
      fetchNotes();
    } catch (err) {
      error.value = `Error pinning note: ${err.message || err}`;
    }
  };

  const archiveNote = async (id, data) => {
    try {
      // Mengirim permintaan PUT ke server untuk mengubah status arsip
      await api.put(`/notes/${id}/archive`, data);
      // Mengambil catatan terbaru setelah pembaruan
      fetchNotes();
    } catch (err) {
      error.value = `Error archiving note: ${err.message || err}`;
    }
  };


  return {
    notes,
    note,
    error,
    fetchNotes,
    fetchNoteById,
    fetchNotesByIsArchived,
    dataFilter,
    fetchNotesByCategory,
    createNote,
    updateNote,
    deleteNote,
    pinNote,
    archiveNote,
  };
}
