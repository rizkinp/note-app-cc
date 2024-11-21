<template>
  <aside class="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-800 text-white" aria-label="Sidebar">
    <div class="h-full px-4 py-6">
      <div class="text-2xl font-semibold mb-6 text-center">
        <span class="text-blue-400">MyApp</span>
      </div>

      <ul class="space-y-4">
        <!-- All Notes Menu -->
        <li>
          <a href="#" @click.prevent="filterNotes('all')" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
            <svg class="w-5 h-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <span class="text-sm">All Notes</span>
          </a>
        </li>

        <!-- Category Menu -->
        <li>
          <button type="button" @click="toggleDropdown" class="flex items-center w-full p-8 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
            <svg class="w-5 h-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            <span class="flex-1 text-left text-sm">Category</span>
            <svg class="w-3 h-3 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <ul :id="'dropdown-example'" :class="{ 'hidden': !isDropdownOpen }" class="py-2 space-y-2 pl-8">
            <li v-for="category in categories" :key="category.id">
              <a href="#" @click.prevent="filterNotes(category.id)" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
                <span class="text-sm">{{ category.name }}</span>
              </a>
            </li>
            <!-- Add Category -->
            <li>
              <!-- If showCategoryInput is false, display a button. If true, display an input field. -->
              <template v-if="!showCategoryInput">
                <button @click="showCategoryInput = true" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
                  <svg class="w-5 h-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 5v14m7-7H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="text-sm">Add Category</span>
                </button>
              </template>
              <template v-else>
                <!-- Input for Adding Category -->
                <input v-model="newCategory" @keyup.enter="createCategory" type="text" placeholder="Enter category name" class="w-full p-2 mt-2 text-white bg-transparent border-none focus:outline-none" />
              </template>
            </li>
          </ul>
        </li>

        <!-- Archives Menu -->
        <li>
          <a href="#" @click.prevent="filterNotes('archived')" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300">
            <span class="text-sm">Arsip</span>
          </a>
        </li>
      </ul>
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
      newCategory: ''
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
    }
  }
};
</script>
