<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
  >
    <div
      class="bg-white rounded-lg shadow-xl p-8 pt-12 w-full max-w-xl relative"
    >
      <button
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        @click="$emit('close')"
        aria-label="Close"
      >
        ✖️
      </button>
      <h2 v-if="title" class="text-2xl font-bold mb-6 text-center">
        {{ title }}
      </h2>
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: "" },
});
</script>
