export default function ({ $axios, $auth, redirect }) {
  $axios.onError(async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // * Intentamos refrezcar el token:
        const { accessToken } = await $axios.$post('/staff/refresh-token', {}, {
          withCredentials: true
        })

        // * Almacenamos el nuevo token.
        $auth.setUserToken(accessToken)

        // * Volvemos a realizar la petición original:
        originalRequest.headers.Autorization = `Bearer ${accessToken}`
        return $axios(originalRequest)
      } catch (refreshError) {
        $auth.logout()
        redirect('/')
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  })
}
