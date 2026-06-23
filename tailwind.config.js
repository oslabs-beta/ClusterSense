/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'nav-gradient': 'linear-gradient(to left, #3D2F91, #89278D)',
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}