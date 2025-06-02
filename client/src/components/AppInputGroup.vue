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
});

const emit = defineEmits(["update:modelValue", "input"]);
const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
