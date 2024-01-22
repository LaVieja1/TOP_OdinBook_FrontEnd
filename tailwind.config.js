/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul': '#9381FF',
        'azul_claro': '#B8B8FF',
        'crema': '#FCECC9',
        'rosa': '#EF7A85',
        'gris': '#5F5449',
      }
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
}