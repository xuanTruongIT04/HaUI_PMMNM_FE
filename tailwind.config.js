/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fce7d3',
          200: '#f9cfa7',
          300: '#f5b77c',
          400: '#f29f50',
          500: '#ef8724',
          600: '#bf6c1d',
          700: '#8f5116',
          800: '#60360e',
          900: '#301b07',
        },
      },
    },
  },
  plugins: [],
}
