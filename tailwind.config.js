/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#7367f0",
        secondary: "#26d6eb",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
