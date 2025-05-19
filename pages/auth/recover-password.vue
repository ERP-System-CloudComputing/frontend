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
      <template v-if="!codeSent">
        <p class="mt-24 text-gris_claro">
          Password recovery
        </p>
        <h2 class="text-3xl font-bold">
          Forgot your password?
        </h2>
        <p class="mt-2 w-25rem text-gris_claro">
          Kindly enter the email address linked to this account and
          we will send you a code to enable you change your
          password.
        </p>
        <form method="POST" action="/" class="mt-16 w-full" @submit.prevent="sendVerificationCode">
          <div class="flex flex-col mb-8">
            <label for="email" class="block text-negro mb-2">Email address</label>
            <input
              id="email"
              v-model="personalEmail"
              type="text"
              name="email"
              placeholder="Enter email address"
              class="w-full p-2 border border-gray-300 rounded-md"
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
      </template>
    </div>

    <div class="w-1/2 relative">
      <img src="../../static/recover-password.png" alt="Logo Image" class="absolute inset-0 w-full h-full object-cover">
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      personalEmail: '',
      loading: false
    }
  },
  methods: {
    async sendVerificationCode () {
      this.loading = true
      try {
        await this.$axios.$post('/staff/send-email', {
          personalEmail: this.personalEmail
        })
        await Swal.fire({
          icon: 'success',
          title: 'e-mail send!',
          text: `Please, check your email!, We will send you information to recover your password to ${this.personalEmail}`,
          timer: 5000,
          showConfirmButton: false
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data?.message || 'Something went wrong!'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
