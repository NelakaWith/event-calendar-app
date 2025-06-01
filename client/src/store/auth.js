// client/src/store/auth.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post(
          "/api/auth/login",
          { email, password },
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
        const res = await axios.get("/api/auth/me", { withCredentials: true });
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
