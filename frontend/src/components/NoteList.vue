<template>
  <div class="note-list p-4 h-full overflow-y-auto bg-white shadow-md rounded-lg">
    <div class="mb-4 flex items-center justify-between relative">
      <input
        v-model="searchQuery"
        @input="onSearch"
        type="text"
        placeholder="Search notes..."
        class="w-full border rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button @click="toggleDropdown" class="ml-4 bg-indigo-500 text-white p-2 rounded-md text-sm">
        Filter
      </button>
      <div v-if="dropdownOpen" class="absolute bg-white shadow-md rounded-md right-0 p-2 z-10 pt-20">
        <ul>
          <li>
            <button @click="setSortOrder('title-asc')" class="block text-sm px-4 py-2">Title A-Z</button>
          </li>
          <li>
            <button @click="setSortOrder('title-desc')" class="block text-sm px-4 py-2">Title Z-A</button>
          </li>
          <li>
            <button @click="setSortOrder('date-asc')" class="block text-sm px-4 py-2">Date Oldest</button>
          </li>
          <li>
            <button @click="setSortOrder('date-desc')" class="block text-sm px-4 py-2">Date Newest</button>
          </li>
        </ul>
      </div>
    </div>
    <!-- Clear ALL Archive Button -->
    <button
      @click="clearAllArchive"
      v-if="isArchived"
      class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      Clear All Archives
    </button>
    <!-- Note List -->
    <ul class="space-y-4">
      <li v-for="note in notes" :key="note.id" class="rounded-lg shadow-sm hover:bg-gray-100 flex items-center justify-between p-2">
        <!-- Checkbox for archiving -->
        <input
          type="checkbox"
          class="checkbox mr-2"
          :checked="note.is_archived"
          @change="toggleArchived(note)"
        />

        <a href="#" @click.prevent="editNote(note)" class="w-full flex items-center space-x-3">
          <div class="flex items-center space-x-3 w-full">
            <div class="flex-1">
              <h3
                class="text-lg font-semibold transition-all"
                :class="{ 'line-through text-gray-500': note.is_archived, 'striking-animation': note.animating }"
              >
                {{ truncateTitle(note.title) }}
              </h3>
              <div class="text-sm text-gray-600 content-preview" v-html="truncateContent(note.content)"></div>
            </div>
          </div>
          <!--Delete Arsip-->
          <img v-if="isArchived" src="../components/icons/ic_delete.png" alt="Arsip" class="w-5 h-5 ml-auto" />
          <!-- Pinned Icon -->
          <img v-if="note.is_pinned" src="../components/icons/ic_pin.png" alt="Pinned" class="w-5 h-5 ml-auto" />
        </a>
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
    isArchived: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      searchQuery: "",
      dropdownOpen: false,
    };
  },
  methods: {
    onSearch() {
      this.$emit("search-notes", this.searchQuery);
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    clearAllArchive() {
      this.$emit("clear-all-archive");
    },
    setSortOrder(order) {
      let sortOrder = '';  // Default to no sorting
      let dateFilter = ''; // Default to no date filter

      if (order === 'title-asc') {
        sortOrder = 'ASC';
      } else if (order === 'title-desc') {
        sortOrder = 'DESC';
      } else if (order === 'date-asc') {
        dateFilter = 'oldest';
      } else if (order === 'date-desc') {
        dateFilter = 'newest';
      }

      this.$emit("sortOrder", { sortOrder, dateFilter });
      this.dropdownOpen = false;
    },
    truncateTitle(title) {
      const maxLength = 20;
      return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
    },
    truncateContent(content) {
      const preview = content.replace(/(<([^>]+)>)/gi, "");
      return preview.length > 30 ? preview.substring(0, 50) + "..." : preview;
    },
    editNote(note) {
      this.$emit("edit-note", note);
    },
    toggleArchived(note) {
      note.animating = true; // Trigger animation
      setTimeout(() => {
        const updatedNote = { ...note, is_archived: !note.is_archived };
        this.$emit("toggle-archived", updatedNote);  // Emit the updated note to the parent
        note.animating = false; // Reset animation flag after update
      }, 300); // Wait for the animation to complete (duration of `0.3s` in the CSS)
    },
  },
};
</script>


<style scoped>
/* Menambahkan animasi untuk garis coret pada title */
.striking-animation {
  animation: strikeThrough 0.3s ease-in-out forwards;
}

@keyframes strikeThrough {
  0% {
    text-decoration: none;
    opacity: 1;
  }
  50% {
    text-decoration: line-through;
    opacity: 0.5;
  }
  100% {
    text-decoration: line-through;
    opacity: 1;
  }
}

/* Transisi halus pada perubahan teks */
h3 {
  transition: text-decoration 0.3s ease, color 0.3s ease;
}
</style>
