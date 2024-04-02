/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideUp: "slideUp 1s ease-in-out alternate",
      },
      keyframes: {
        slideUp: {
          "0%": { right: "0" },
          "50%": { bottom: "5" },
          "100%": { bottom: "0" },
        },
      },
    },
  },
  plugins: [],
};
