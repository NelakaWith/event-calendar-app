<template>
  <div class="app-input-group">
    <label :for="id">{{ label }}</label>
    <div class="relative">
      <input
        v-bind="inputAttrs"
        :id="id"
        :type="showPassword ? (type === 'password' ? 'text' : type) : type"
        v-model="modelValueProxy"
        @input="
          $emit('update:modelValue', modelValueProxy);
          $emit('input', $event);
        "
        :autocomplete="autocomplete"
        class="pr-10"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
        @click="togglePassword"
        tabindex="-1"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
      >
        <span v-if="showPassword">🙈</span>
        <span v-else>🐵</span>
      </button>
    </div>
    <AppFormError :message="error" />
    <div
      v-if="hint && !error"
      class="app-form-error"
      :style="{ color: hintColor }"
    >
      {{ hint }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AppFormError from "./AppFormError.vue";

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: "" },
  id: { type: String, required: true },
  name: { type: String, default: "" },
  type: { type: String, default: "text" },
  error: { type: String, default: "" },
  autocomplete: { type: String, default: "off" },
  inputAttrs: { type: Object, default: () => ({}) },
  hint: { type: String, default: "" },
  hintColor: { type: String, default: "#888" },
});

const emit = defineEmits(["update:modelValue", "input"]);
const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
