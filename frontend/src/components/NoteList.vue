<template>
  <div class="note-list p-4 h-full overflow-y-auto bg-white shadow-md rounded-lg">
    <div class="mb-4 flex items-center justify-between relative">
      <input v-model="searchQuery" @input="onSearch" type="text" placeholder="Search notes..."
        class="w-full border rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
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

    <!-- Clear All Archived Notes Button -->
    <button @click="deleteAllNotes" v-if="isArchived"
      class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
      Clear All Archives
    </button>

    <!-- No Notes Found Section -->
    <div v-if="notes.length === 0" class="flex flex-col items-center justify-center text-center py-20">
      <img src="../components/icons/ic_404.png" alt="No Notes Found" class="w-56 h-56 mb-4" />
      <p class="text-lg text-gray-500">No Notes Found</p>
    </div>

    <!-- Note List -->
    <ul v-if="notes.length > 0" class="space-y-4">
      <li v-for="note in notes" :key="note.id"
        class="rounded-lg shadow-sm hover:bg-gray-100 flex items-center justify-between p-2">
        <!-- Checkbox for archiving -->
        <input type="checkbox" class="checkbox mr-2" :checked="note.is_archived" @change="toggleArchived(note)" />

        <a href="#" @click.prevent="editNote(note)" class="w-full flex items-center space-x-3">
          <div class="flex items-center space-x-3 w-full">
            <div class="flex-1">
              <h3 class="text-lg font-semibold transition-all"
                :class="{ 'line-through text-gray-500': note.is_archived, 'striking-animation': note.animating }">
                {{ truncateTitle(note.title) }}
              </h3>
              <div class="text-sm text-gray-600 content-preview" v-html="truncateContent(note.content)"></div>
            </div>
          </div>

          <!-- Delete Icon for Individual Note -->
          <img v-if="isArchived" @click="deleteNote(note.id)" src="../components/icons/ic_delete.png" alt="Delete Note"
            class="w-5 h-5 ml-auto" />

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
    deleteAllNotes() {
      this.$emit("delete-all-notes");
    },
    setSortOrder(order) {
      let sortOrder = '';
      let dateFilter = '';

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
      note.animating = true;
      setTimeout(() => {
        const updatedNote = { ...note, is_archived: !note.is_archived };
        this.$emit("toggle-archived", updatedNote);
        note.animating = false;
      }, 300);
    },
    deleteNote(id) {
      this.$emit("delete-note", id);
    },
  },
};
</script>



<style scoped>
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
h3 {
  transition: text-decoration 0.3s ease, color 0.3s ease;
}
</style>
