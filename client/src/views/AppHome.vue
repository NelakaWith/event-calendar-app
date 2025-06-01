<template>
  <div>
    <h1>Home</h1>
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/calendar">Calendar</router-link>
    <router-view />
  </div>
</template>

<script setup>
// Home page logic (if any)
</script>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
</style>
