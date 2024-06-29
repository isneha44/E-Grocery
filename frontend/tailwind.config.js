/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00A4D8',
      },

      fontFamily: {
        "Roboto": ["Roboto", 'sans-serif'],
      },
    },
  },
  plugins: [],
}