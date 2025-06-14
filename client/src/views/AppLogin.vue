<template>
  <div class="login">
    <div class="login__container">
      <h2>Welcome Back</h2>
      <h3>Please login to continue.</h3>
      <form @submit.prevent="onSubmit" novalidate>
        <AppInputGroup
          label="Email"
          id="email"
          name="email"
          type="email"
          autocomplete="username"
          v-model="email"
          :error="errors.email"
          @input="validateField('email')"
        />
        <AppInputGroup
          label="Password"
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          v-model="password"
          :error="errors.password"
          @input="validateField('password')"
        />
        <AppFormError v-if="errors.form" :message="errors.form" />
        <div class="login__container__keep-logged-in">
          <label class="app-input-group">
            <input type="checkbox" v-model="keepLoggedIn" />
            Keep me logged in
          </label>
          <label>Forgot your password?</label>
        </div>
        <button type="submit" :disabled="!isFormValid">Login</button>
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
import { ref, computed, watch } from "vue";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import AppInputGroup from "../components/form/AppInputGroup.vue";
import AppFormError from "../components/form/AppFormError.vue";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const keepLoggedIn = ref(false);
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

const isFormValid = computed(() => {
  return (
    email.value &&
    password.value &&
    !errors.value.email &&
    !errors.value.password &&
    (!errors.value.form || (!errors.value.email && !errors.value.password))
  );
});

watch([email, password], () => {
  if (errors.value.form) errors.value.form = "";
});

const onSubmit = async () => {
  errors.value = {};
  try {
    await schema.validate(
      { email: email.value, password: password.value },
      { abortEarly: false }
    );
    await auth.login(email.value, password.value, keepLoggedIn.value);
    if (auth.isAuthenticated) {
      router.push("/calendar");
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
        &:last-child {
          @apply cursor-not-allowed;
          @apply text-gray-400;
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
}
</style>
