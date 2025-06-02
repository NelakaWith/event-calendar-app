<template>
  <div class="app-input-group">
    <label :for="id">{{ label }}</label>
    <input
      v-bind="inputAttrs"
      :id="id"
      :type="type"
      v-model="modelValueProxy"
      @input="
        $emit('update:modelValue', modelValueProxy);
        $emit('input', $event);
      "
      :autocomplete="autocomplete"
    />
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
import { computed, toRefs } from "vue";
import AppFormError from "./AppFormError.vue";

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: "" },
  id: { type: String, required: true },
  name: { type: String, default: "" },
  type: { type: String, default: "text" },
  error: { type: String, default: "" },
  autocomplete: { type: String, default: "" },
  inputAttrs: { type: Object, default: () => ({}) },
  hint: { type: String, default: "" },
  hintColor: { type: String, default: "#888" },
});

const emit = defineEmits(["update:modelValue", "input"]);
const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
