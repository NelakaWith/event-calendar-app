<template>
  <div class="flex-1">
    <label :for="id">{{ label }}</label>
    <Datepicker
      v-bind="inputAttrs"
      :id="id"
      v-model="modelValueProxy"
      :is-24="true"
      :enable-time-picker="true"
      :minute-increment="5"
      :format="'yyyy-MM-dd HH:mm'"
      input-class="app-date-time-picker"
      @update:model-value="onInput"
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
import { computed } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import AppFormError from "./AppFormError.vue";

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: [String, Date], default: "" },
  id: { type: String, required: true },
  name: { type: String, default: "" },
  error: { type: String, default: "" },
  inputAttrs: { type: Object, default: () => ({}) },
  hint: { type: String, default: "" },
  hintColor: { type: String, default: "#888" },
});
const emit = defineEmits(["update:modelValue", "input"]);
const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
const onInput = (val) => {
  emit("update:modelValue", val);
  emit("input", val);
};
</script>
<style lang="scss" scoped>
:deep(.dp__input) {
  @apply w-full px-3 py-2 ps-10 border rounded-md focus:outline-none ring-1;
  @apply focus:ring-primary-hover ring-primary-light;
}
</style>
