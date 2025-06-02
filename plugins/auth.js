export default async function ({ app, redirect }) {
  // * Codigo que funciona solo del lado del cliente
  if (process.client) {
    const { $auth, $axios } = app

    const cleanUpSession = async () => {
      try {
        // * Llamamos a la API para cerrar sesion:
        await $axios.post('/staff/logout')
      } catch (error) {
        console.error('Logout error: ', error)
      } finally {
        // * Limpiar Frontend:
        $auth.logout()
        // * Limpiar almacenamiento local:
        localStorage.clear()

        // * Limpiamos las Cookies manualmente:
        const cookies = ['auth._token.local', 'auth._refreshToken.local', 'auth._token_expiration.local', 'refreshToken']
        cookies.forEach((cookie) => {
          document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`
        })
      }
    }

    if (!$auth?.loggedIn) {
      return
    }

    try {
      const rememberMe = localStorage.getItem('rememberMe') === 'true'

      // * Cuando NO esta marcado el 'rememberMe':
      if (!rememberMe) {
        // Si no hay rememberMe, verificar si los tokens están en el almacenamiento correcto
        const hasLocalStorageToken = localStorage.getItem('auth._token.local')

        if (hasLocalStorageToken) {
          // * Si hay tokens en localStorage cuando no debería, limpiar todo
          await cleanUpSession()
          return redirect('/')
        }
      } else {
        // * Validar token cuando rememberMe está activo
        try {
          const response = await $axios.get('/staff/validate-token')
          if (!response.data?.valid) {
            await cleanUpSession()
            return redirect('/')
          }
        } catch (error) {
          console.error('Error validando token:', error)
          await cleanUpSession()
          return redirect('/?session=expired')
        }
      }
    } catch (error) {
      console.error('Error en plugin de auth:', error)
      await cleanUpSession()
      return redirect('/')
    }
  }
}
