/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        surface: "#1E1E2F",
        primary: "#9F4DFF",
        primaryLight: "#C084FC",
        text: "#FFFFFF",
        textSecondary: "#A0A0A0",
        border: "#2D2D2D",
      },
    },
  },
  plugins: [],
}
