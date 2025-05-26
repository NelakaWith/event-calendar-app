// client/src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/AppHome.vue";
import Login from "../components/AppLogin.vue";
import Register from "../components/AppRegister.vue";
import Calendar from "../components/AppCalendar.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/calendar", name: "Calendar", component: Calendar },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
