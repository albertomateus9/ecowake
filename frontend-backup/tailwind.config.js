/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#60A5FA',
          100: '#3C61BA',
          200: '#1B2C54',
          DEFAULT: '#182850',
        },
        success: '#4ADE80',
        warning: '#FACC15',
        alert: '#F97316',
        critical: '#EF4444',
        background: '#111B37',
        surface: '#F3F4F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
