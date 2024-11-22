<template>
  <div class="note-editor p-4 h-full overflow-y-auto bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">{{ currentNote ? 'Edit Note' : 'Create Note' }}</h2>
    <form @submit.prevent="saveNote">
      <!-- Input Title -->
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="note.title"
          type="text"
          id="title"
          class="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <!-- Select Category -->
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <select
          v-model="note.categoryId"
          id="category"
          class="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="" disabled selected>Select a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Content Editor -->
      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <div ref="quillEditor" class="mt-1 w-full h-60 border rounded-md shadow-sm"></div>
      </div>

      <!-- Pin Note -->
      <div class="mb-4 flex items-center">
        <input
          v-model="note.is_pinned"
          type="checkbox"
          id="is_pinned"
          class="mr-2"
        />
        <label for="is_pinned" class="text-sm font-medium text-gray-700">Pin this note</label>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        {{ currentNote ? 'Update' : 'Save' }}
      </button>
    </form>
  </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
  name: 'NoteEditor',
  props: {
    currentNote: {
      type: Object,
      required: false,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  watch: {
    currentNote(newNote) {
      if (newNote) {
        this.note = {
          ...newNote,
          categoryId: newNote.category || '',
        };
        this.updateEditorContent();
      }
    },
  },
  data() {
    return {
      note: this.currentNote
        ? { ...this.currentNote, categoryId: this.currentNote.category }
        : { title: '', content: '', categoryId: '', is_pinned: false },
      quill: null,
    };
  },
  mounted() {
    this.quill = new Quill(this.$refs.quillEditor, {
      theme: 'snow',
      placeholder: 'Write your content here...',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link'],
          ['blockquote'],
          [{ align: [] }],
          ['image'],
        ],
      },
    });
    this.updateEditorContent();
  },
  methods: {
    saveNote() {
      // Ambil konten dari Quill editor
      this.note.content = this.quill.root.innerHTML;

      // Emit event untuk menyimpan atau memperbarui catatan
      if (this.currentNote) {
        this.$emit('update-note', this.note);
      } else {
        this.$emit('save-note', this.note);
      }

      // Reset form
      this.note = { title: '', content: '', categoryId: '', is_pinned: false };
      this.quill.root.innerHTML = '';
    },
    updateEditorContent() {
      if (this.quill && this.note.content) {
        this.quill.root.innerHTML = this.note.content;
      }
    },
  },
};
</script>
