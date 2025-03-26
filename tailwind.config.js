/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{html,js,ts,svelte}"],
  theme: {
    extend: {
      colors: {
        shade: {
          300: "#333",
          400: "#444",
          800: "#888",
        },
        primary: "#1D4ED8",
        secondary: "#FDE047",
        info: "#3B82F6",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        32: "8rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  // plugins: [forms, typography],
};
