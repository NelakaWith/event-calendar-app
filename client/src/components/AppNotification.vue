<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg',
        bgClass,
        textClass,
      ]"
    >
      <span>{{ message }}</span>
      <button class="ml-4 text-lg font-bold" @click="close">×</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: "error" }, // 'error', 'success', etc.
  duration: { type: Number, default: 3500 },
});
const emit = defineEmits(["close"]);
const visible = ref(true);

const bgClass = props.type === "error" ? "bg-red-600" : "bg-green-600";
const textClass = "text-white";

const close = () => {
  visible.value = false;
  emit("close");
};

watch(
  () => props.message,
  () => {
    visible.value = true;
    if (props.duration > 0) {
      setTimeout(close, props.duration);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
