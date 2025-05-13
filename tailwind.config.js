module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "azul-claro-logo": "#14ADD6",
        "azul-oscuro-logo": "#384295",
        "gray-fondo": "#F8F9FD"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
