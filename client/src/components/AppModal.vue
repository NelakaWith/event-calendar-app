<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay">
      <div class="modal-content animate-modal">
        <div class="modal-header">
          <h2 v-if="title" class="modal-title">
            {{ title }}
          </h2>
          <button
            class="modal-close"
            @click="$emit('close')"
            aria-label="Close"
          >
            ✖️
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: "" },
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40;

  .modal-content {
    @apply bg-white rounded-lg shadow-xl p-6 w-full max-w-xl flex flex-col;

    .modal-header {
      @apply flex items-center justify-between mb-6;

      .modal-title {
        @apply text-2xl font-bold text-center;
      }
      .modal-close {
        @apply text-gray-400 hover:text-gray-700 text-sm cursor-pointer;
      }
    }
    .modal-body {
      @apply flex-1;
    }
  }
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.animate-modal {
  animation: modal-pop 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes modal-pop {
  0% {
    transform: scale(0.95) translateY(20px);
    opacity: 0.7;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>
