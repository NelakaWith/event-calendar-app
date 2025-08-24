import { createApp } from "vue";
import "./scss/main.scss";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";

// Fetch CSRF token and set it in Axios headers
async function fetchCsrfToken() {
  try {
    const response = await axios.get("/api/csrf-token");
    axios.defaults.headers.common["X-CSRF-Token"] = response.data.csrfToken;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
}

// Call the function during app initialization
fetchCsrfToken();

// Optional: Add Axios interceptor to handle CSRF errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      alert(
        "Your session has expired or the request is invalid. Please refresh the page."
      );
    }
    return Promise.reject(error);
  }
);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
