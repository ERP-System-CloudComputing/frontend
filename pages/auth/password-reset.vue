<template>
  <div class="flex box-border min-h-screen">
    <div class="flex flex-col w-1/2 p-16">
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
        Password recovery
      </p>
      <h2 class="text-3xl font-bold">
        Password reset
      </h2>
      <p class="mt-2 w-25rem text-gris_claro">
        Kindly enter a new password
      </p>

      <form method="POST" action="/" class="mt-16 w-full" @submit.prevent="resetPassword">
        <div class="relative">
          <label for="password" class="block text-negro mb-2">New password</label>
          <input
            id="password"
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            placeholder="**********"
            class="w-full p-2 border border-gray-300 rounded-md"
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

        <div class="relative">
          <label for="confirmPassword" class="block text-negro mb-2">Confirm new password</label>
          <input
            id="confirmPassword"
            v-model="confirmedPassword"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            placeholder="**********"
            class="w-full p-2 border border-gray-300 rounded-md"
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

        <input
          type="submit"
          value="Reset"
          class="w-full mt-8 px-4 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
        >
      </form>
    </div>

    <div class="w-1/2 relative">
      <img src="../../static/recover-password.png" alt="Logo Image" class="absolute inset-0 w-full h-full object-cover">
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

export default {
  components: { FontAwesomeIcon },
  data () {
    return {
      showPassword: false,
      icons: {
        eye: faEye,
        eyeSlash: faEyeSlash
      },
      token: '',
      newPassword: '',
      confirmedPassword: '',
      loading: false
    }
  },
  mounted () {
    // await this.$axios.setHeader('Authorization', `Bearer ${this.$cookies.get('token')}`)
    this.token = this.$route.query.token
    if (!this.token) {
      Swal.fire({
        icon: 'error',
        title: 'Token not found',
        text: 'Please, request a new token',
        timer: 5000,
        showConfirmButton: false
      })
    }
  },
  methods: {
    // * Metodos para verificacion y comprobacion de contraseñas
    validatePassword () {
      if (this.newPassword !== this.confirmedPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Passwords do not match',
          text: 'Please, enter the same password in both fields'
        })
        return false
      }
      if (this.newPassword.length < 8 || this.confirmedPassword < 8) {
        Swal.fire({
          icon: 'error',
          title: 'Password too short',
          text: 'Please, enter a password with at least 8 characters'
        })
        return false
      }
      return true
    },
    async resetPassword () {
      if (!this.validatePassword()) {
        return false
      }
      this.loading = true
      try {
        await this.$axios.$post('/staff/reset-password', {
          token: this.token,
          newPassword: this.newPassword
        })
        Swal.fire({
          icon: 'success',
          title: 'Password reset',
          text: 'Your password has been reset successfully',
          timer: 5000,
          showConfirmButton: false
        }).then(() => {
          this.$router.push('/')
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Something went wrong, try again later'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
