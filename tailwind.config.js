/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}", // Adjust this if you have other file types
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    import('@tailwindcss/typography'),
    import('@tailwindcss/forms'),
  ],
};
