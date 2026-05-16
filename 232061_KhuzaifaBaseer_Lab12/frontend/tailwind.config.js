/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8640A',
        'primary-dark': '#C4540A',
        'primary-light': '#F5A050',
        wood: {
          50: '#FAF7F2',
          100: '#F0E8D8',
          200: '#DEC9A0',
          300: '#C4A870',
          400: '#A88450',
          500: '#8B6840',
          600: '#6E5030',
          700: '#523C24',
          800: '#3A2A1A',
          900: '#261A0E',
        },
      },
      fontFamily: {
        heading: ['Georgia', 'Times New Roman', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
