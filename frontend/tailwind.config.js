export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0f9fb',
          100: '#e0f2f7',
          500: '#2180c5',
          600: '#1d7480',
          700: '#1a6873',
        }
      }
    },
  },
  plugins: [],
}
