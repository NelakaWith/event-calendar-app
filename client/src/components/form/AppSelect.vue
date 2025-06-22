<template>
  <div class="app-input-group">
    <label :for="id" v-if="label">{{ label }}</label>
    <select
      :id="id"
      :name="name"
      :value="modelValue"
      :class="['form-select', { 'input-error': error }]"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
      <slot />
    </select>
    <AppFormError v-if="error" :message="error" />
  </div>
</template>

<script setup>
import AppFormError from "./AppFormError.vue";
const props = defineProps({
  label: String,
  id: String,
  name: String,
  modelValue: [String, Number],
  error: String,
});
</script>

<style scoped>
.input-error {
  border-color: #ef4444; /* red-500 */
}
</style>
