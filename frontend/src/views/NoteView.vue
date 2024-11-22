<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <SidebarComponent :categories="categories" @filter-notes="filterNotes" @create-category="createCategory" @delete-category="deleteCategoryHandler" @logout="logoutHandler"
      class="w-64 h-full" />

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Note List -->
      <NoteList :notes="filteredNotes" :isArchived="isArchived" @sortOrder="sortNotes" @edit-note="setCurrentNote"
        @search-notes="searchNotes" @toggle-archived="archiveNoteHandler" @deleteNote="deleteNoteHandler"
        @deleteAllNotes="deleteAllNotesHandler" class="w-2/4 h-full overflow-y-auto" />

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
import { useAuth } from '@/composable/useAuth';
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
    const { notes, fetchNotes, fetchNotesByCategory, fetchNotesByIsArchived, createNote, updateNote, dataFilter, archiveNote, deleteAllNotes, deleteNote } = useNote();
    const { categories, fetchCategories, createCategory, deleteCategory } = useCategory();
    const {logout} = useAuth();
    const currentNote = ref(null);
    const searchQuery = ref("");
    const isArchived = ref(false);

    // Fetch initial data
    onMounted(() => {
      fetchCategories();
      fetchNotes();
    });
    // Filter notes
    const filteredNotes = computed(() => {
      let sortedNotes = notes.value;

      // Pin priority
      sortedNotes = [...sortedNotes].sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        return 0;
      });
      //Searching
      if (searchQuery.value) {
        sortedNotes = sortedNotes.filter(note =>
          note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return sortedNotes;
    });
    // Sort notes
    const sortNotes = ({ sortOrder, dateFilter }) => {
      dataFilter({ sortOrder, dateFilter });
    };
    // Set current note
    const setCurrentNote = (note) => {
      currentNote.value = note;
    };
    // Filter notes
    const filterNotes = (filter) => {
      if (filter === 'all') {
        isArchived.value = false;
        fetchNotes();
      } else if (filter === 'archived') {
        isArchived.value = true;
        console.log(isArchived.value);
        fetchNotesByIsArchived();
      } else {
        isArchived.value = false;
        fetchNotesByCategory(filter);
      }
    };
    // Search
    const searchNotes = (query) => {
      searchQuery.value = query;
    };
    // Archive
    const archiveNoteHandler = async (updatedNote) => {
      try {
        await archiveNote(updatedNote.id, { is_archived: updatedNote.is_archived });
        fetchNotes();
      } catch (error) {
        console.error("Error archiving note:", error);
      }
    };
    // Update Notes
    const updateNoteHandler = (updatedNote) => {
      updateNote(updatedNote.id, updatedNote);
      currentNote.value = null;
    };
    // Delete All Notes
    const deleteAllNotesHandler = () => {
      deleteAllNotes();
      isArchived.value = false;
    };
    // Delete Note
    const deleteNoteHandler = (id) => {
      deleteNote(id);
      isArchived.value = true;
    };
    // Delete Category
    const deleteCategoryHandler = (id) => {
      deleteCategory(id);
      isArchived.value = false;
    };

    // Logout
    const logoutHandler= () => {
      logout();
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
      isArchived,
      deleteAllNotesHandler,
      deleteNoteHandler,
      deleteCategoryHandler,
      logoutHandler
    };
  },
};
</script>
