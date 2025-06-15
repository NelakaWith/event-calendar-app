<template>
  <div class="register">
    <div class="register__container">
      <h2>Register</h2>
      <h3>Create a new account to get started.</h3>
      <form @submit.prevent="onSubmit" novalidate>
        <AppInputGroup
          label="Email"
          id="email"
          name="email"
          type="email"
          v-model="email"
          :error="errors.email"
          @input="validateField('email')"
        />
        <AppInputGroup
          label="Name"
          id="name"
          name="name"
          type="text"
          v-model="name"
          :error="errors.name"
          @input="validateField('name')"
        />
        <AppInputGroup
          label="Password"
          id="password"
          name="password"
          type="password"
          v-model="password"
          :error="errors.password"
          :hint="`${passwordStrength}`"
          :hintColor="passwordStrengthColor"
          @input="
            (e) => {
              validateField('password');
              checkStrength();
            }
          "
        />
        <AppInputGroup
          label="Repeat Password"
          id="passwordRepeat"
          name="passwordRepeat"
          type="password"
          v-model="passwordRepeat"
          :error="errors.passwordRepeat"
          @input="validateField('passwordRepeat')"
        />
        <AppFormError v-if="errors.form" :message="errors.form" />
        <button type="submit" :disabled="!isFormValid">Register</button>
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
const passwordRepeat = ref("");
const name = ref("");
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
    passwordStrengthColor.value = theme("colors.primary.hover", "#16a34a"); // use Tailwind config if possible
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
  name: yup
    .string()
    .matches(/^[A-Za-z ]+$/, "Name must contain only letters and spaces.")
    .required("Name is required."),
  password: yup.string().required("Password is required."),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Please repeat your password."),
});

const validateField = async (field) => {
  try {
    await schema.validateAt(field, {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordRepeat: passwordRepeat.value,
    });
    errors.value[field] = "";
  } catch (err) {
    errors.value[field] = err.message;
  }
};

function allFieldsFilled() {
  return email.value && password.value && name.value && passwordRepeat.value;
}

function hasAnyError() {
  return (
    errors.value.email ||
    errors.value.password ||
    errors.value.name ||
    errors.value.passwordRepeat ||
    errors.value.form
  );
}

const isFormValid = computed(() => {
  return allFieldsFilled() && !hasAnyError();
});

watch([email, password, name, passwordRepeat], () => {
  // Clear form-level error as soon as any input changes
  if (errors.value.form) errors.value.form = "";
});

const onSubmit = async () => {
  errors.value = {};
  try {
    await schema.validate(
      {
        name: name.value,
        email: email.value,
        password: password.value,
        passwordRepeat: passwordRepeat.value,
      },
      { abortEarly: false }
    );
    await auth.register(email.value, password.value, name.value);
    if (auth.isAuthenticated) {
      router.push("/login");
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
      @apply bg-primary text-white hover:bg-primary-hover;
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
