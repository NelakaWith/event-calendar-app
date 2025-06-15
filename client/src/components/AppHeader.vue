<template>
  <header class="nav-header">
    <nav class="flex gap-6 text-base items-end">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/calendar" class="nav-link">Calendar</router-link>
      <button
        class="nav-link bg-transparent border-none cursor-pointer"
        @click="$emit('logout')"
      >
        Logout
      </button>
    </nav>
  </header>
</template>

<script setup>
// No logic needed for now
</script>

<style lang="scss" scoped>
.nav-header {
  @apply flex items-center justify-end py-4 bg-gray-100 border-b border-gray-300 mb-8 px-8;
  nav {
    @apply flex gap-6 text-base;
    .nav-link {
      @apply text-gray-700 hover:text-primary-hover transition font-semibold;
    }
  }
}
</style>
