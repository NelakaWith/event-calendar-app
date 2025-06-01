<template>
  <div class="register">
    <div class="register__container">
      <h2>Register</h2>
      <h3>Create a new account to get started.</h3>
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
            autocomplete="new-password"
            @input="
              validateField('password');
              checkStrength();
            "
          />
          <div v-if="errors.password" class="app-form-error">
            {{ errors.password }}
          </div>
          <div
            v-if="passwordStrength && !errors.password"
            class="app-form-error"
            :style="{ color: passwordStrengthColor }"
          >
            {{ passwordStrength }}
          </div>
        </div>
        <div class="app-input-group">
          <label for="passwordRepeat">Repeat Password</label>
          <input
            v-model="passwordRepeat"
            id="passwordRepeat"
            name="passwordRepeat"
            type="password"
            autocomplete="new-password"
            @input="validateField('passwordRepeat')"
          />
          <div v-if="errors.passwordRepeat" class="app-form-error">
            {{ errors.passwordRepeat }}
          </div>
        </div>
        <div v-if="errors.form" class="app-form-error">
          {{ errors.form }}
        </div>
        <button type="submit" :disabled="!email || !password">Register</button>
      </form>
      <hr />
      <small>
        Already have an account?
        <u><router-link to="/login">Log in</router-link> </u>
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
const passwordRepeat = ref("");
const passwordStrength = ref("");
const passwordStrengthColor = ref("#888");
const errors = ref({});

const checkStrength = () => {
  const val = password.value;
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[a-z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  if (score <= 2) {
    passwordStrength.value = "Weak";
    passwordStrengthColor.value = "#dc2626"; // red-600
  } else if (score === 3 || score === 4) {
    passwordStrength.value = "Medium";
    passwordStrengthColor.value = "#f59e42"; // orange-400
  } else if (score === 5) {
    passwordStrength.value = "Strong";
    passwordStrengthColor.value = "#16a34a"; // green-600
  } else {
    passwordStrength.value = "";
    passwordStrengthColor.value = "#888";
  }
};

const schema = yup.object({
  email: yup
    .string()
    .email("Email is required and must be valid.")
    .required("Email is required and must be valid."),
  password: yup.string().required("Password is required."),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Please repeat your password."),
});

const validateField = async (field) => {
  try {
    await schema.validateAt(field, {
      email: email.value,
      password: password.value,
      passwordRepeat: passwordRepeat.value,
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
      {
        email: email.value,
        password: password.value,
        passwordRepeat: passwordRepeat.value,
      },
      { abortEarly: false }
    );
    await auth.register(email.value, password.value);
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
.register {
  @apply flex items-start md:items-center justify-center h-screen;
  @apply md:bg-gray-100;
  &__container {
    @apply p-8 md:rounded-lg md:shadow-lg w-full md:max-w-lg;
    @apply bg-white;
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
}
</style>
