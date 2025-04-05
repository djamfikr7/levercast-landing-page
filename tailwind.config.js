/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
      },
      backgroundColor: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
      },
      textColor: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
      },
    },
  },
  plugins: [],
} 