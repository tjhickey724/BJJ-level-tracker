/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bjj-blue': '#0066CC',
        'bjj-purple': '#663399',
        'bjj-brown': '#8B4513',
        'bjj-black': '#000000',
      },
    },
  },
  plugins: [],
}
