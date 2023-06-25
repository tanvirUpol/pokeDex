/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'player2p': ['"Press Start 2P"', 'cursive'],
        'VT323': ['VT323', 'monospace']
      },
    },
  },
  plugins: [],
}