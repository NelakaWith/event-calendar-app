// client/src/store/auth.js
import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),
  actions: {
    async login(email, password, keepLoggedIn = false) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post(
          "/api/auth/login",
          { email, password, keepLoggedIn },
          { withCredentials: true }
        );
        this.user = res.data.user;
        this.isAuthenticated = true;
      } catch (err) {
        this.error = "Invalid email or password! Please try again";
        this.user = null;
        this.isAuthenticated = false;
      } finally {
        this.loading = false;
      }
    },
    async register(email, password, name) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post(
          "/api/auth/register",
          { email, password, name },
          { withCredentials: true }
        );
        this.user = res.data.user;
        this.isAuthenticated = true;
      } catch (err) {
        this.error = "Registration failed! Please try again.";
        this.user = null;
        this.isAuthenticated = false;
      } finally {
        this.loading = false;
      }
    },
    async checkAuth() {
      this.loading = true;
      try {
        const res = await axios.get("/api/auth/user", {
          withCredentials: true,
        });
        this.user = res.data.user;
        this.isAuthenticated = true;
      } catch {
        this.user = null;
        this.isAuthenticated = false;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
