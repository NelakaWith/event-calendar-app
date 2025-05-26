<template>
  <div class="login">
    <div class="login__container">
      <h2>Login</h2>
      <form @submit.prevent="onSubmit">
        <div>
          <label for="email">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            autocomplete="username"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            autocomplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const onSubmit = () => {
  // TODO: Implement login logic (API call)
  // Example: console.log(email.value, password.value);
};
</script>

<style lang="scss" scoped>
.login {
  @apply flex items-center justify-center h-screen bg-gray-100;
  &__container {
    @apply bg-white p-8 rounded shadow-md w-full max-w-sm;
  }
  h2 {
    @apply text-2xl font-bold mb-6 text-center;
  }
  form {
    @apply space-y-4;
  }
  label {
    @apply block text-gray-700 mb-1;
  }
  input {
    @apply w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-700;
  }
  button {
    @apply w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition;
  }
}
</style>
