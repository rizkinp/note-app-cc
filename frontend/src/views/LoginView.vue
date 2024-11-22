<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
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
        <div class="mb-6">
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
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      <p class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="/register" class="text-indigo-600 hover:underline">Register</a>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuth } from '../composable/useAuth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { login, error, isLoading } = useAuth();
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const handleLogin = async () => {
      try {
        await login(email.value, password.value);
        router.push('/');
      } catch (err) {
        console.error('Login error:', err);
      }
    };

    return {
      email,
      password,
      handleLogin,
      error,
      isLoading
    };
  }
};
</script>
