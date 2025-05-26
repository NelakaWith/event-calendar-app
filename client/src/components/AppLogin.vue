<template>
  <div class="login">
    <div class="login__container">
      <h2>Login</h2>
      <form @submit.prevent="onSubmit">
        <div v-if="errors.form" class="login__container__error">
          {{ errors.form }}
        </div>
        <div>
          <label for="email">Email</label>
          <input
            v-model="email"
            id="email"
            name="email"
            type="email"
            required
            autocomplete="username"
            @input="validateField('email')"
          />
          <div v-if="errors.email" class="login__container__error">
            {{ errors.email }}
          </div>
        </div>
        <div>
          <label for="password">Password</label>
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            required
            autocomplete="current-password"
            @input="validateField('password')"
          />
          <div v-if="errors.password" class="login__container__error">
            {{ errors.password }}
          </div>
        </div>
        <button type="submit" :disabled="!email || !password">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const errors = ref({});

const schema = yup.object({
  email: yup.string().email().required("Email is required and must be valid."),
  password: yup.string().required("Password is required."),
});

const validateField = async (field) => {
  try {
    await schema.validateAt(field, {
      email: email.value,
      password: password.value,
    });
    errors.value[field] = "";
  } catch (err) {
    errors.value[field] = err.message;
  }
};

const onSubmit = async () => {
  errors.value = {};
  try {
    await schema.validate(
      { email: email.value, password: password.value },
      { abortEarly: false }
    );
    await auth.login(email.value, password.value);
    if (auth.isAuthenticated) {
      router.push("/my-profile");
    } else if (auth.error) {
      errors.value.form = auth.error;
    }
  } catch (err) {
    errors.value.form = "Invalid email or password.";
  }
};
</script>

<style lang="scss" scoped>
.login {
  @apply flex items-center justify-center h-screen;
  @apply bg-gray-100;
  &__container {
    @apply p-8 rounded-md shadow-md w-full max-w-sm;
    @apply bg-white;
    &__error {
      @apply text-red-600;
      @apply text-sm mb-2;
    }
  }
  h2 {
    @apply text-2xl font-bold mb-6 text-center;
  }
  form {
    @apply space-y-4;
  }
  label {
    @apply block;
    @apply text-gray-700 mb-1;
  }
  input {
    @apply w-full px-3 py-2 border rounded focus:outline-none focus:ring-2;
    @apply focus:ring-green-500;
  }
  button {
    @apply w-full transition rounded;
    @apply bg-green-500 text-white py-2  hover:bg-green-600;
    &:disabled {
      @apply bg-gray-400 cursor-not-allowed;
    }
  }
}
</style>
