<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <SidebarComponent :categories="categories" @filter-notes="filterNotes" @create-category="createCategory"
      class="w-64 h-full" />

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Note List -->
      <NoteList :notes="filteredNotes" @sortOrder="sortNotes" @edit-note="setCurrentNote" @search-notes="searchNotes" @toggle-archived="archiveNoteHandler"
        class="w-2/4 h-full overflow-y-auto" />

      <!-- Note Editor -->
      <NoteEditor :currentNote="currentNote" :categories="categories" @update-note="updateNoteHandler"
        @save-note="createNote" class="w-2/4 h-full overflow-y-auto" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useNote } from '@/composable/useNote';
import { useCategory } from '@/composable/useCategory';
import SidebarComponent from '@/components/SidebarComponent.vue';
import NoteList from '@/components/NoteList.vue';
import NoteEditor from '@/components/NoteEditor.vue';

export default {
  name: 'NoteView',
  components: {
    SidebarComponent,
    NoteList,
    NoteEditor
  },
  setup() {
    const { notes, fetchNotes, fetchNotesByCategory, createNote, updateNote, dataFilter, archiveNote } = useNote();
    const { categories, fetchCategories, createCategory } = useCategory();
    const currentNote = ref(null);
    const searchQuery = ref("");

    // Fetch initial data
    onMounted(() => {
      fetchCategories();
      fetchNotes();
    });

    // Filter notes based on search query
    const filteredNotes = computed(() => {
      if (!searchQuery.value) {
        return notes.value;
      }
      return notes.value.filter(note =>
        note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Fungsi untuk menangani pengurutan
    const sortNotes = ({ sortOrder, dateFilter }) => {
      dataFilter({ sortOrder, dateFilter });
    };

    const setCurrentNote = (note) => {
      currentNote.value = note;
    };

    const filterNotes = (filter) => {
      if (filter === 'all') {
        fetchNotes();
      } else {
        fetchNotesByCategory(filter);
      }
    };

    const searchNotes = (query) => {
      searchQuery.value = query;
    };

    const archiveNoteHandler = async (updatedNote) => {
  try {
    // Panggil API untuk memperbarui status arsip
    await archiveNote(updatedNote.id, { is_archived: updatedNote.is_archived });

    // Setelah berhasil mengarsipkan, perbarui daftar catatan
    fetchNotes();
  } catch (error) {
    console.error("Error archiving note:", error);
  }
};

    const updateNoteHandler = (updatedNote) => {
      updateNote(updatedNote.id, updatedNote);
      currentNote.value = null;
    };

    return {
      notes,
      archiveNote,
      archiveNoteHandler,
      categories,
      currentNote,
      filteredNotes,
      searchNotes,
      setCurrentNote,
      filterNotes,
      createCategory,
      createNote,
      updateNoteHandler,
      sortNotes,
    };
  },
};
</script>
