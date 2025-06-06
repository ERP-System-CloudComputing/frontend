<template>
  <div class="md:flex box-border min-h-screen">
    <div class="flex flex-col md:w-1/2 p-16">
      <div class="flex justify-between items-center">
        <div>
          <a href="/">
            <img src="../../static/logo.png" alt="Logo Image" class="w-20 h-20">
          </a>
        </div>
        <a
          href="/register"
          class="relative mt-8 px-4 py-3 bg-white text-primario rounded-lg
                 hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer
                 before:absolute before: inset-0 before:rounded-lg before:p-[-2px]
                 before:bg-gradient-to-r before:from-primario before:to-secundario before:-z-10"
        >
          Sign Up
        </a>
      </div>
      <p class="mt-24 text-gris_claro">
        Welcome back!!
      </p>
      <h2 class="text-3xl font-bold">
        Please Sign In
      </h2>

      <form method="POST" class="mt-16 w-full" @submit.prevent="login">
        <div class="flex flex-col mb-8">
          <label for="email" class="block text-negro mb-2">Email address</label>
          <input
            id="email"
            v-model="user.personalEmail"
            type="text"
            name="email"
            placeholder="Enter email address"
            class="w-full p-2 border border-gray-300 rounded-md border-solid"
            required
          >
        </div>

        <div class="relative">
          <label for="password" class="block text-negro mb-2">Password</label>
          <input
            id="password"
            v-model="user.password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            placeholder="**********"
            class="w-full p-2 border border-gray-300 rounded-md border-solid"
            required
          >
          <button
            type="button"
            class="absolute right-3 top-9 p-1"
            arial-label="Show password"
            @click="showPassword = !showPassword"
          >
            <FontAwesomeIcon
              :icon="showPassword ? 'eye' : 'eye-slash'"
              class="text-gray-500"
            />
          </button>
        </div>

        <div class="mt-8 flex justify-between items-center">
          <label class="inline-flex items-center">
            <input v-model="user.rememberMe" type="checkbox" class="mr-1 border-solid">
            <span>Remember me</span>
          </label>
          <NuxtLink to="/auth/recover-password" class="text-primario hover:scale-105 transform duration-500">
            I forgot my password
          </NuxtLink>
        </div>

        <input
          type="submit"
          value="Sign In"
          class="w-full mt-8 px-4 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                 hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
        >
      </form>
    </div>
    <div class="hidedn md:block md:w-1/2 relative">
      <img src="../../static/login.png" alt="Logo Image" class="absolute inset-0 w-full h-full object-cover">
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

export default {
  components: { FontAwesomeIcon },
  middleware: 'isAuth',
  data () {
    return {
      showPassword: false,
      icons: {
        eye: faEye,
        eyeSlash: faEyeSlash
      },
      user: {
        personalEmail: '',
        password: '',
        rememberMe: false
      }
    }
  },
  mounted () {
    if (this.$route.query.session === 'expired') {
      Swal.fire({
        icon: 'warning',
        title: 'Session expired!',
        text: 'Your session has expired. Please log in again.'
      })
    }
    // * Cargamos el estado de rememberMe si existe en localStorage:
    const storedRememberMe = localStorage.getItem('rememberMe')
    if (storedRememberMe !== null) {
      this.user.rememberMe = storedRememberMe === 'true'
    }

    const rememberMeOn = localStorage.getItem('rememberMe') === 'true'
    if (rememberMeOn) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    async login () {
      // * Guardamos el estado de rememberMe antes de llamar a la API:
      localStorage.setItem('rememberMe', this.user.rememberMe.toString())
      try {
        // await this.$axios.$post('/staff/login', {
        //   personalEmail: this.user.personalEmail,
        //   password: this.user.password,
        //   rememberMe: this.user.rememberMe
        // }, {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   withCredentials: true // * Para las Cookies HTTP-only y se envíen y reciban las cookies
        // })

        const response = await this.$auth.loginWith('local', {
          data: this.user
        })
        if (response.status === 200) {
          this.$router.push('/dashboard')
        }

        // if (this.user.rememberMe) {
        //   // await localStorage.setItem('auth.accessToken', response.accessToken)
        //   await this.$auth.setUserToken(response.accessToken) // * Guardamos el token en el almacenamiento local de Nuxt Auth
        // } else {
        //   // * Almacenamos el token en sessionStorage de la forma de Nuxt Auth:
        //   await this.$auth.setUserToken(response.accessToken) // * // Esto puede ser redundante si ya está en las cookies
        //   // await sessionStorage.setItem('auth.accessToken', response.accessToken)
        // }

        // this.$router.push('/dashboard')
      } catch (error) {
        this.user.personalEmail = ''
        this.user.password = ''
        this.user.rememberMe = false

        // alert(error.response?.data?.message || 'Error al iniciar sesión')
        this.$auth.reset() // * Limpiar el estado de autenticación local
        // localStorage.removeItem('auth._token.local')
        localStorage.removeItem('auth._tokenlocal')
        // localStorage.removeItem('auth._refreshToken.local') // Limpiar también el refresh token
        localStorage.removeItem('auth._token_expiration.local')
        localStorage.removeItem('rememberMe')
        sessionStorage.removeItem('auth.accessToken') // Limpiar sessionStorage por si acaso
        localStorage.removeItem('rememberMe') // Limpiar el estado de rememberMe

        let errorMessage = 'An error occurred during login'

        if (error.response) {
          errorMessage = error.response.data.message ||
        (error.response.status === 401
          ? 'Invalid credentials'
          : error.response.status === 400
            ? 'Invalid email or password'
            : 'Error during login')
        }
        Swal.fire({
          icon: 'error',
          title: 'Incorrect!',
          text: errorMessage,
          footer: '<a href="/auth/recover-password"> forgot your password? Click here for recover it</a>'
          // footer: '<a href="/auth/email-verified">Email not confirmed? Active your account here</a>'
        })
      }
    }
  }
}
</script>
