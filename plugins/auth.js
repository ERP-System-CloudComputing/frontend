export default function ({ app, redirect, route, store }) {
  // El plugin se ejecuta en el servidor y en el cliente.
  // La mayor parte de la lógica de "remember me" y rehidratación
  // la maneja @nuxtjs/auth-next con autoFetch: true y redirect.home.

  // Solo si es estrictamente necesario añadir un interceptor o lógica de limpieza personalizada.
  if (process.client) {
    const { $auth, $axios } = app
    // console.log('[Auth Plugin] Running on client side.')

    // * Función para limpiar la sesión y redirigir
    const cleanUpAndRedirectToLogin = async (message = 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.') => {
      // console.log(`[Auth Plugin] cleanUpAndRedirectToLogin called. Message: ${message}`)
      try {
        // Llama a $auth.logout() que también hará la petición al backend si tienes el endpoint configurado
        if ($auth.loggedIn) {
          // console.log('[Auth Plugin] User was logged in. Attempting $auth.logout().')
          await $auth.logout() // Esto debería limpiar tokens y hacer la petición al backend si está configurado.
          // console.log('[Auth Plugin] $auth.logout() completed.')
        } else {
          // console.log('[Auth Plugin] User not logged in, no need to call $auth.logout().')
          // Si no estaba logueado, asegura la limpieza local de Nuxt Auth
          $auth.reset()
        }
      } catch (error) {
        // En caso de que el logout al backend falle (ej. backend no disponible)
        // console.error('[Auth Plugin] Error during $auth.logout() process:', error)
        $auth.reset() // Asegura la limpieza local
      } finally {
        localStorage.removeItem('rememberMe') // Asegurarse de limpiar rememberMe
        // Las cookies HTTP-only no pueden limpiarse desde JS. El backend debe hacerlo.
        // Las cookies no HTTP-only se limpiarán con $auth.logout()

        if (route.path !== '/') {
          // console.log('[Auth Plugin] Redirecting to login page after cleanup.')
          redirect('/?session=expired')
        } else {
          // console.log('[Auth Plugin] Already on login page, no redirection needed after cleanup.')
        }
      }
    }

    // * Interceptor para manejar errores 401 que Nuxt Auth no captura directamente para el refresh
    $axios.onError(async (error) => {
      // console.log(`[Auth Plugin] Axios onError: status ${error.response?.status}, path: ${route.path}`)

      // Si el error es 401 y no es una petición que ya hemos reintentado
      if (error.response?.status === 401 && !error.config._retry) {
        // Si estamos en la página de login y obtenemos un 401, simplemente lo rechazamos.
        // No intentamos refrescar aquí, ya que el usuario está en el proceso de login o ya deslogueado.
        if (route.path === '/') {
          // console.log('[Auth Plugin] On login page, ignoring 401 error in interceptor.')
          return Promise.reject(error)
        }

        error.config._retry = true // Marca la petición como reintentada
        // console.log('[Auth Plugin] Received 401 (Unauthorized) error, attempting token refresh...')

        try {
          // Intenta refrescar el token. Nuxt Auth lo hará usando el refreshToken de la cookie.
          // Esto debería activar la lógica de refreshToken en tu nuxt.config.js
          await $auth.refreshTokens()
          // console.log('[Auth Plugin] Token refreshed successfully. Retrying original request.')
          // Si el refresh es exitoso, actualiza el header de autorización y reintenta la petición original
          error.config.headers.Authorization = $auth.strategy.token.get()
          return $axios.request(error.config)
        } catch (refreshError) {
          // console.error('Refresh token failed:', refreshError)
          // Si el refresh falla (refreshToken caducado, inválido, etc.),
          // limpiar sesión y redirigir al login.
          await cleanUpAndRedirectToLogin('Tu sesión no pudo ser restaurada. Por favor, inicia sesión de nuevo.')
          return Promise.reject(refreshError) // Propagar el error de refresh
        }
      }
      return Promise.reject(error) // Propagar otros errores o errores 401 ya reintentados
    })

    // ** Eliminar el bloque de "Lógica al inicio de la aplicación para 'Remember Me'" de aquí **
    // Dejar que Nuxt Auth con `autoFetch: true` y `redirect.home` maneje esto.
    // Tu plugin ya está configurado en `nuxt.config.js` bajo `auth.plugins`.
    // Esto asegura que el plugin se ejecute muy temprano en el ciclo de vida.

    // Una validación adicional, si sientes que es necesaria y el `middleware/isAuth.js` no basta:
    // Si la aplicación se carga en el cliente, el usuario no está logueado,
    // pero `rememberMe` es true y no estamos en la página de login,
    // *y* Nuxt Auth NO ha logrado rehidratar la sesión,
    // esto es una señal de que algo falló con `autoFetch` o el `refreshToken`
    // y necesitamos limpiar.
    if (!$auth.loggedIn && localStorage.getItem('rememberMe') === 'true' && route.path !== '/') {
      // console.log('[Auth Plugin] Detected non-logged in state with rememberMe. Checking if tokens exist.')
      // Un pequeño retraso para asegurar que @nuxtjs/auth-next haya tenido tiempo de intentar rehidratar
      // Aunque el plugin se ejecuta temprano, a veces hay un micro-retraso en la rehidratación del estado.
      // Esto es una medida de seguridad, pero la lógica de Nuxt Auth debería cubrirlo.
      setTimeout(async () => {
        if (!$auth.loggedIn) { // Re-check after a brief moment
          const hasLocalAuthToken = localStorage.getItem('auth._token.local')
          // No podemos revisar el refreshToken si es HTTP-only, pero podemos inferir por el accessToken
          if (!hasLocalAuthToken) { // Si no hay accessToken en localStorage y rememberMe es true, algo salió mal
            // console.warn('[Auth Plugin] User expected to be logged in (rememberMe=true) but no token found. Forcing cleanup.')
            await cleanUpAndRedirectToLogin('Tu sesión no pudo ser restaurada. Por favor, inicia sesión de nuevo.')
          }
        }
      }, 100) // Pequeño retraso
    }
  }
}
