export default {
  darkMode: "dark", // enables class-based dark mode (for shadcn UI)
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"), // if you want shadcn animations
  ],
};