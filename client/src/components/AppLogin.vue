<template>
  <div class="login">
    <div class="login__container">
      <h2>Welcome Back</h2>
      <h3>Please enter your credentials to continue</h3>
      <form @submit.prevent="onSubmit" novalidate>
        <div class="app-input-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            id="email"
            name="email"
            type="email"
            autocomplete="username"
            @input="validateField('email')"
          />
          <div v-if="errors.email" class="app-form-error">
            {{ errors.email }}
          </div>
        </div>
        <div class="app-input-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            @input="validateField('password')"
          />
          <div v-if="errors.password" class="app-form-error">
            {{ errors.password }}
          </div>
        </div>
        <div v-if="errors.form" class="app-form-error">
          {{ errors.form }}
        </div>
        <div class="login__container__keep-logged-in">
          <label>
            <input type="checkbox" v-model="auth.keepLoggedIn" />
            Keep me logged in
          </label>
          <label>Forgot your password?</label>
        </div>
        <button type="submit" :disabled="!email || !password">Login</button>
      </form>
      <hr />
      <small>
        Don't have an account?
        <u><router-link to="/register">Sign up</router-link> </u>
      </small>
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
  email: yup
    .string()
    .email("Email is required and must be valid.")
    .required("Email is required and must be valid."),
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
    errors.value.form = "Something went wrong! Please try again.";
  }
};
</script>

<style lang="scss" scoped>
.login {
  @apply flex items-start md:items-center justify-center h-screen;
  @apply md:bg-gray-100;
  &__container {
    @apply p-8 md:rounded-lg md:shadow-lg w-full md:max-w-lg;
    @apply bg-white;
    &__keep-logged-in {
      @apply flex items-center justify-between;
      label {
        @apply text-sm cursor-pointer;
      }
    }
  }
  h2 {
    @apply text-3xl font-bold mb-2 text-center;
  }
  h3 {
    @apply mb-6 text-center text-sm;
    @apply text-gray-600;
  }
  form {
    @apply space-y-4 mb-6;
  }
  button {
    @apply w-full py-2 transition rounded;
    @apply bg-green-500 text-white hover:bg-green-600;
    &:disabled {
      @apply bg-gray-400 cursor-not-allowed;
    }
  }
  hr {
    @apply my-6 border-gray-300;
  }
  small {
    @apply block w-full text-sm text-center;
    @apply text-gray-600;
    u {
      @apply text-blue-500 hover:text-blue-700;
    }
  }
}
</style>
