/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        dark: "#0f172a",
        glass: "rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};
