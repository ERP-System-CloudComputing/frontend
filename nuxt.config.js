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

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fortawesome.js',
    '~/plugins/vxe-table.js',
    '~/plugins/tokensExpired.js',
    '~/plugins/days.js',
    { src: '~/plugins/v-calendar.js', mode: 'client' }
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

  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: process.env.APP_URL
    baseURL: process.env.APP_URL || 'https://backend-erp-system-cxenaxhufchmf6d2.canadacentral-01.azurewebsites.net/api',
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
          type: 'Bearer',
          // name: 'Authorization', // * Generalmente no es necesario si el tipo es 'Bearer'
          expiration: 'accessTokenExpiration'
        },
        user: {
          property: 'user',
          autoFetch: true // * Si es true, se llamará automáticamente a la ruta '/user' para obtener el usuario actual
        },
        endpoints: {
          login: {
            url: '/staff/login',
            method: 'POST',
            propertyName: false // * Debe ir asi si backend devuelte { accessToken, refreshToken, user: {...} }
          },
          logout: {
            url: '/staff/logout',
            method: 'POST'
          },
          refreshToken: {
            url: '/staff/refresh-token',
            method: 'POST',
            propertyName: 'accessToken' // * El nombre de la propiedad que contiene el token en la respuesta del BACKEND si la respuesta es `{ accessToken, expireIn }` y refreshToken va en cooki
          },
          // user: false
          user: {
            url: '/staff/user',
            method: 'GET',
            propertyName: 'user' // * El nombre de la propiedad que contiene el token en la respuesta del BACKEND
          }
        },
        tokenRequired: true, // * Requiere un token para acceder a las rutas protegidas
        tokenType: 'Bearer', // * El tipo de token que se enviará en la cabecera de autorización
        autologout: true // * Importante: Esto activará la redirección automática si la renovación falla
      }
    },
    redirect: {
      login: '/', // * // La página a la que redirigir si no está autenticado
      logout: '/', // * La página a la que redirigir después de cerrar sesión
      home: '/dashboard' // * // La página a la que redirigir después de un login exitoso
    },
    storage: {
      sync: true, // * Sincroniza el estado de autenticación entre pestañas (requiere localStorage)
      watch: true // * Observa cambios en el almacenamiento (útil para logout global)
    },
    resetOnError: true,
    plugins: ['~/plugins/auth.js'], // * PLUGIN PRINCIPAL
    fullPathRedirect: true // * Redirige a la ruta completa después de login
    // setRefreshToken: true, // * Asegúrate de que el refreshToken se esté configurando
    // refreshBeforeParse: true, // * Intenta refrescar antes de cada parse de la petición
    // refreshInValidOnRefresh: true // * Invalida el token si el refresh falla
  },
  vuetify: {
    // ✅ CONFIGURACIÓN DE ICONOS
    defaultAssets: {
      icons: 'mdi', // Habilita Material Design Icons automáticamente
      font: true
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
