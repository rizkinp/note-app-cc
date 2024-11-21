<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <SidebarComponent :categories="categories" @filter-notes="filterNotes" @create-category="createCategory"
      class="w-64 h-full" />

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Note List -->
      <NoteList :notes="notes" @edit-note="setCurrentNote" class="w-1/3 h-full overflow-y-auto" />

      <!-- Note Editor -->
      <NoteEditor :currentNote="currentNote" :categories="categories" @update-note="updateNoteHandler"
        @save-note="createNote" class="w-2/3 h-full overflow-y-auto" />

    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';
import NoteList from '@/components/NoteList.vue';
import NoteEditor from '@/components/NoteEditor.vue';
import { useNote } from '@/composable/useNote';
import { useCategory } from '@/composable/useCategory';
import { onMounted, ref } from 'vue';

export default {
  name: 'NoteView',
  components: {
    SidebarComponent,
    NoteList,
    NoteEditor
  },
  setup() {
    const { notes, fetchNotes, fetchNotesByCategory, createNote, updateNote } = useNote();
    const { categories, fetchCategories, createCategory } = useCategory();

    const currentNote = ref(null);

    onMounted(() => {
      fetchCategories();
      fetchNotes();
    });

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

    const updateNoteHandler = (updatedNote) => {
      updateNote(updatedNote.id, updatedNote);
      currentNote.value = null;
    };

    return {
      notes,
      categories,
      currentNote,
      setCurrentNote,
      filterNotes,
      createCategory,
      createNote,
      updateNoteHandler
    };
  }
};
</script>
