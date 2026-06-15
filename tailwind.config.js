/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#020617', // deep slate blue-dark
          card: 'rgba(15, 23, 42, 0.4)', // glassmorphism card fill
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#06b6d4', // cyan
          blue: '#2563eb', // primary blue
          green: '#10b981', // green
          emerald: '#059669', // emerald
          teal: '#14b8a6', // teal
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
