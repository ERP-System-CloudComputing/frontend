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
        Email verification
      </h2>
      <p class="mt-2 w-25rem text-gris_claro">
        Kindly enter the 6 digit code that has been sent to your email address.
      </p>

      <button
        class="mt-2 text-primario font-medium hover:opacity-90 duration-500 transform hover:scale-105 focus:outline-none "
        :disabled="loading"
        @click="getCode"
      >
        Get Code
      </button>
      <!-- <p class="mt-2 w-25rem text-gris_claro hover:cursor-pointer" @submit.prevent="getCode">
        Get Code
      </p> -->

      <form method="POST" action="/" class="mt-11 w-full" @submit.prevent="verifyCode">
        <div class="flex flex-col mb-8">
          <label for="code">Verification Code</label>
          <input
            id="code"
            v-model="verificationCode"
            name="code"
            placeholder="Enter 6 digit-code"
            max-length="6"
            class="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            required
          >
        </div>
        <input
          type="submit"
          value="Send"
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
import Swal from 'sweetalert2'
import jwtDecoded from 'jwt-decode'

export default {
  data () {
    return {
      verificationCode: '',
      personalEmail: '',
      loading: false,
      isValidToken: false
    }
  },
  methods: {
    async getCode () {
      const token = this.$route.query.token // * obtenemos el token de la url despues del -> ?
      if (!token) {
        this.showAlert('Token not found or not provided')
        return
      }
      try {
        // * Decodificamos el token para obtener el correo personal:
        const decoded = jwtDecoded(token)
        this.personalEmail = decoded.email
        // * Verificamos token y enviamos codigo:
        await this.$axios.$post('/staff/verify-token-and-send-code', {
          token
        })
        this.isValidToken = true
        Swal.fire({
          icon: 'success',
          title: 'e-mail send!',
          text: `We've sent a 6-digit verification code to ${this.personalEmail}`,
          timer: 4000,
          showConfirmButton: false
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Code',
          text: error.response?.data?.message || 'The verification code you entered is incorrect. Please try again.'
        })
      }
    },
    showAlert (message) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Code',
        text: message
      })
    },
    async verifyCode () {
      if (!this.isValidToken) {
        return
      }
      this.loading = true
      try {
        const response = await this.$axios.$post('/staff/verify-reset-code', {
          personalEmail: this.personalEmail,
          code: this.verificationCode
        })
        Swal.fire({
          icon: 'success',
          title: 'Code verified!',
          text: 'The verification code you entered is correct. You can now reset your password.',
          timer: 4000,
          showConfirmButton: false
        })
        this.$router.push('/auth/password-reset?token=' + response.resetToken)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Code',
          text: error.response?.data?.message || 'The verification code you entered is incorrect. Please try again.'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
