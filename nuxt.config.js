export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend-ERP-System',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/tailwindcss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fortawesome.js',
    '~/plugins/vxe-table.js',
    '~/plugins/tokensExpired.js',
    '~/plugins/auth.js'
  ],

  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.APP_URL,
    credentials: true, // * Para las cookies,
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          maxAge: 1200, // * 20 min (segundos)
          global: true,
          required: true,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          maxAge: 172800, // * 2 dias (segundos)
          global: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/staff/login', method: 'POST', propertyName: false },
          logout: false,
          refreshToken: {
            url: '/staff/refresh-token',
            method: 'POST',
            propertyName: 'accessToken'
          },
          user: false
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/dashboard'
    },
    resetOnError: true
  },
  vuetify: {
    // ✅ CONFIGURACIÓN DE ICONOS
    defaultAssets: {
      icons: 'mdi' // Habilita Material Design Icons automáticamente
    },
    icons: {
      iconfont: 'mdi' // Usa Material Design Icons
    },
    theme: {
      dark: false
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
