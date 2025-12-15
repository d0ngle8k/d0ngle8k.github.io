/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        surface: '#0b0c10',
        card: '#111217',
        accent: '#e0e0e0',
        primary: '#f5f5f5',
        secondary: '#9ca3af'
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
};
