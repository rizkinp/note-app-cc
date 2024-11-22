<template>
  <aside class="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-800 text-white flex flex-col justify-between" aria-label="Sidebar">
    <div class="h-full px-4 py-6">
      <div class="text-2xl font-semibold mb-6 text-center">
        <span class="text-blue-400">Note App</span>
      </div>
      <ul class="space-y-4">
        <!--All Notes-->
        <li>
          <a href="#" @click.prevent="filterNotes('all')" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
            <svg class="w-5 h-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <span class="text-sm">All Notes</span>
          </a>
        </li>
        <!--Categories-->
        <li>
          <button type="button" @click="toggleDropdown" class="flex items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
            <svg class="w-5 h-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            <span class="flex-1 text-left text-sm">Category</span>
            <svg class="w-3 h-3 ml-2 transform transition-transform" :class="{'rotate-180': isDropdownOpen}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <ul :id="'dropdown-example'" :class="{ 'hidden': !isDropdownOpen, 'transition-all duration-300': true }" class="py-2 space-y-2 pl-8">
            <li v-for="category in categories" :key="category.id" @contextmenu.prevent="showContextMenu($event, category)">
              <a href="#" @click.prevent="filterNotes(category.id)" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
                <span class="text-sm">{{ category.name }}</span>
              </a>
            </li>
            <li v-if="showCategoryInput">
              <input v-model="newCategory" @keyup.enter="createCategory" type="text" placeholder="Enter category name" class="w-full p-2 mt-2 text-white bg-transparent border-2 border-gray-600 focus:outline-none focus:border-blue-400" />
            </li>
            <li v-else>
              <button @click="showCategoryInput = true" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
                <svg class="w-5 h-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 5v14m7-7H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="text-sm">Add Category</span>
              </button>
            </li>
          </ul>
        </li>
        <!-- Archived Notes -->
        <li>
          <a href="#" @click.prevent="filterNotes('archived')" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
            <span class="text-sm">Arsip</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Logout Button -->
    <button @click="logout" class="w-full p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300 flex items-center justify-center">
      <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 17l5-5-5-5v3H3v4h7v3zM18 3h-2v8h2V3z" />
      </svg>
      <span class="text-sm">Logout</span>
    </button>

    <!-- Context Menu for Deleting Category -->
    <div v-if="contextMenuVisible" :style="{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }"
      class="absolute bg-gray-700 text-white p-2 rounded-lg shadow-lg">
      <button @click="deleteCategory(contextMenuCategory)" class="text-sm hover:bg-gray-600 p-2 rounded-md">Delete Category</button>
    </div>
  </aside>
</template>


<script>
export default {
  name: 'SidebarComponent',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      showCategoryInput: false,
      newCategory: '',
      contextMenuVisible: false,
      contextMenuCategory: null,
      contextMenuPosition: { x: 0, y: 0 }
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    filterNotes(filter) {
      this.$emit('filter-notes', filter);
    },
    createCategory() {
      if (this.newCategory.trim()) {
        this.$emit('create-category', { name: this.newCategory.trim() });
        this.newCategory = '';
        this.showCategoryInput = false;
      }
    },
    showContextMenu(event, category) {
      this.contextMenuCategory = category;
      this.contextMenuPosition = { x: event.clientX, y: event.clientY };
      this.contextMenuVisible = true;
    },
    deleteCategory(category) {
      this.$emit('delete-category', category.id);
      this.contextMenuVisible = false;
    },
    closeContextMenu() {
      this.contextMenuVisible = false;
    },
    logout() {
      this.$emit('logout');
    }
  },
  mounted() {
    window.addEventListener('click', this.closeContextMenu);
  },
  beforeUnmount() {
    window.removeEventListener('click', this.closeContextMenu);
  }
};
</script>

<style scoped>
.context-menu {
  position: fixed;
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
