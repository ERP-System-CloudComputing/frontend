module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'azul-claro-logo': '#14ADD6',
        'azul-oscuro-logo': '#384295',
        'gray-fondo': '#F8F9FD',
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
              primario: '#14ADD6',
              secundario: '#384295',
              gris_claro: '#4b5563',
              negro: '#000000'
            },
            backgroundImage: {
              'gradient-primario-secundario': 'linear-gradient(to right, #14ADD6, #384295)'
            },
            width: {
              '25rem': '25rem'
            }
          }
        },
        variants: {
          extend: {}
        },
        plugins: [
          require('@tailwindcss/forms'),
          function ({ addVariant }) {
            addVariant('before', '&::before')
          }
        ]
      }
    }
  }
}
