/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
    fontFamily: {nunito: ["Nunito Sans", "sans-serif"]}
    },
  },
  plugins: [],
}

