<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <form @submit.prevent="handleRegister">
        <!-- Name Input -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="name"
            v-model="username"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <!-- Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          :disabled="isLoading"
        >
          Register
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      <p class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/login" class="text-indigo-600 hover:underline">Login</a>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Impor useRouter
import { useAuth } from '../composable/useAuth';

export default {
  setup() {
    const { register, error, isLoading } = useAuth();
    const router = useRouter(); // Mendapatkan instance router

    const username = ref('');
    const email = ref('');
    const password = ref('');

    const handleRegister = async () => {
      try {
        await register(username.value, email.value, password.value);
        console.log(username.value, email.value, password.value);
        // Redirect ke halaman login setelah registrasi berhasil
        router.push('/login'); // Gunakan router.push
      } catch (err) {
        console.error('Registration error:', err);
      }
    };

    return {
      username,
      email,
      password,
      handleRegister,
      error,
      isLoading
    };
  }
};
</script>

