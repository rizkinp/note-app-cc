<template>
  <div class="note-list p-4 h-full overflow-y-auto bg-white shadow-md rounded-lg">
    <!-- Search Field -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search notes..."
        class="w-full border rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <!-- Notes List -->
    <ul class="space-y-4">
      <li
        v-for="note in filteredNotes"
        :key="note.id"
        class="rounded-lg shadow-sm hover:bg-gray-100 flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <!-- Checkbox -->
          <input
            type="checkbox"
            class="checkbox"
            :checked="note.completed"
            @change="toggleCompleted(note)"
          />
          <!-- Title and Preview -->
          <div>
            <a
              href="#"
              @click.prevent="editNote(note)"
              class="block"
            >
              <h3
                class="text-lg font-semibold transition-all"
                :class="{ 'line-through text-gray-500': note.completed }"
              >
                {{ note.title }}
              </h3>
              <div
                class="text-sm text-gray-600 content-preview"
                v-html="getPreview(note.content)"
              ></div>
            </a>
          </div>
        </div>
        <!-- Edit Icon -->
        <button
          @click="editNote(note)"
          class="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <img
            src="../components/icons/ic_edit.png"
            alt="Edit"
            class="w-5 h-5"
          />
        </button>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "NoteList",
  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "", // Query pencarian
    };
  },
  computed: {
    filteredNotes() {
      // Filter catatan berdasarkan query pencarian
      return this.notes.filter((note) =>
        note.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    editNote(note) {
      this.$emit("edit-note", note);
    },
    // Fungsi untuk mengambil preview dengan batasan karakter
    getPreview(content) {
      const preview = content.replace(/(<([^>]+)>)/gi, ""); // Menghapus tag HTML
      return preview.length > 50 ? preview.substring(0, 50) + "..." : preview;
    },
    // Fungsi untuk toggle status completed
    toggleCompleted(note) {
      note.completed = !note.completed;
      this.$emit("update-note", note);
    },
  },
};
</script>

<style scoped>
/* Menambahkan ellipsis dengan CSS */
.content-preview {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Menambahkan gaya untuk coretan */
.line-through {
  text-decoration: line-through;
  color: gray;
}

.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #4f46e5; /* Warna checkbox */
}
</style>
