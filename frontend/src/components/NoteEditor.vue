<template>
  <div class="note-editor p-4 h-full overflow-y-auto bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">{{ currentNote ? 'Edit Note' : 'Create Note' }}</h2>
    <form @submit.prevent="saveNote">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input v-model="note.title" type="text" id="title"
          class="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required />
      </div>

      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <select v-model="note.categoryId" id="category"
          class="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
          <option value="" disabled selected>Select a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <div ref="quillEditor" class="mt-1 w-full h-60 border rounded-md shadow-sm"></div>
      </div>

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
      required: false
    },
    categories: {
      type: Array,
      required: true
    }
  },
  watch: {
    currentNote(newNote) {
      if (newNote) {
        // Pastikan categoryId dipetakan dengan benar
        this.note = { ...newNote, categoryId: newNote.category || '' }; // Pastikan categoryId selalu terisi
        this.updateEditorContent();
      }
    }
  },
  data() {
    return {
      note: this.currentNote ? { ...this.currentNote, categoryId: this.currentNote.category } : { title: '', content: '', categoryId: '' },
      quill: null
    };
  },
  mounted() {
    this.quill = new Quill(this.$refs.quillEditor, {
      theme: 'snow',
      placeholder: 'Write your content here...',
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link'],
          ['blockquote'],
          [{ 'align': [] }],
          ['image']
        ]
      }
    });
    this.updateEditorContent();
  },
  methods: {
    saveNote() {
      // Ambil konten dari Quill editor
      this.note.content = this.quill.root.innerHTML;

      // Pastikan konten tidak kosong sebelum melanjutkan
      if (!this.note.content) {
        this.note.content = '';  // Set ke string kosong jika tidak ada konten
      }

      // Emit event untuk update atau simpan note
      if (this.currentNote) {
        this.$emit('update-note', this.note);
      } else {
        this.$emit('save-note', this.note);
      }

      // Reset data di form
      this.note = { title: '', content: '', categoryId: '' };

      // Clear konten di editor Quill
      this.quill.root.innerHTML = '';  // Kosongkan editor
    },

    updateEditorContent() {
      if (this.quill && this.note.content) {
        this.quill.root.innerHTML = this.note.content;
      }
    }
  }
}
</script>
