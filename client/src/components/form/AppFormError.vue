<template>
  <div v-if="message" class="app-form-error">
    {{ message }}
  </div>
</template>

<script setup>
const props = defineProps({
  message: { type: String, default: "" },
});
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
