<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 class="text-xl font-semibold mb-4">Create Note</h3>
      <form @submit.prevent="createNote">
        <div class="mb-4">
          <label for="title" class="block text-gray-700">Title</label>
          <input
            v-model="title"
            id="title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="content" class="block text-gray-700">Content</label>
          <textarea
            v-model="content"
            id="content"
            rows="4"
            class="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Create
          </button>
        </div>
      </form>
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500">
        &times;
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useNote } from '../composable/useNote';

export default {
  setup() {
    const { createNote } = useNote();
    const title = ref('');
    const content = ref('');

    const submitForm = () => {
      createNote({
        title: title.value,
        content: content.value,
      });
      title.value = '';
      content.value = '';
      $emit('close'); // Close the modal after creating the note
    };

    return {
      title,
      content,
      createNote: submitForm,
    };
  },
};
</script>

<style scoped>
/* Add modal specific styles if needed */
</style>
