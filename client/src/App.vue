<template>
  <div class="flex flex-col h-screen">
    <div>
      <AppHeader v-if="!isAuthPage" @logout="handleLogout" />
    </div>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import { useAuthStore } from "./store/auth";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const authPages = ["/login", "/register"];
const isAuthPage = computed(() => authPages.includes(route.path));

const handleLogout = async () => {
  await auth.logout();
  router.push("/login");
};
</script>

<style scoped></style>
