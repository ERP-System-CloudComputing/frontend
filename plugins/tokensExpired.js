export default function ({ $axios, $auth }) {
  $axios.onRequest((config) => {
    if ($auth && $auth.loggedIn) {
      const token = $auth.strategy.token.get()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })

  $axios.onError(async (error) => {
    // * Si el error es de tipo 401 y no se ha intentado refrezcar el token:
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true

      try {
        // * Intentamos refrezcar el token:
        const response = await $axios.$post('/staff/refresh-token', {
          refreshToken: $auth.strategy.refreshToken.get()
        }, {
          withCredentials: true
        })

        const { accessToken, refreshToken } = response

        // * Actualizamos los nuevos tokens.
        await $auth.strategy.token.set(accessToken)
        await $auth.strategy.refreshToken.set(refreshToken)

        // * Volvemos a realizar la petición original:
        error.config.headers.Authorization = `Bearer ${accessToken}`
        return $axios(error.config)
      } catch (refreshError) {
        await $auth.logout()
        localStorage.removeItem('auth.accessToken')
        sessionStorage.removeItem('auth.accessToken')
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  })
}
