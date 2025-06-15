/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22c55e", // green-500
          hover: "#16a34a", // green-600
          active: "#15803d", // green-700
          light: "#4ade80", // green-400
        },
        secondary: {
          DEFAULT: "#2563eb", // blue-600
          hover: "#1d4ed8", // blue-700
        },
      },
      ringColor: {
        primary: "#22c55e",
        "primary-hover": "#16a34a",
        "primary-light": "#4ade80",
      },
      textColor: {
        primary: "#22c55e",
        "primary-hover": "#16a34a",
      },
    },
  },
  plugins: [],
};
