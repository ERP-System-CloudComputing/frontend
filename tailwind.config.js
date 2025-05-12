module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14ADD6'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
