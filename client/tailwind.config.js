// Color variables
const primary = "#334155"; // slate-700 (darker)
const primaryHover = "#1e293b"; // slate-800 (darker)
const primaryActive = "#0f172a"; // slate-900 (darkest)
const primaryLight = "#475569"; // slate-600 (still dark)
const secondary = "#1e40af"; // blue-800 (darker)
const secondaryHover = "#1e3a8a"; // blue-900 (darkest)

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: primary,
          hover: primaryHover,
          active: primaryActive,
          light: primaryLight,
        },
        secondary: {
          DEFAULT: secondary,
          hover: secondaryHover,
        },
      },
      ringColor: {
        primary: primary,
        "primary-hover": primaryHover,
        "primary-light": primaryLight,
      },
      textColor: {
        primary: primary,
        "primary-hover": primaryHover,
      },
    },
  },
  plugins: [],
};
