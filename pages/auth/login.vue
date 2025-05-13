<template>
  <div class="flex box-border min-h-screen">
    <div class="flex flex-col w-1/2 p-16">
      <div class="flex justify-between items-center">
        <div>
          <img src="../../static/logo.png" alt="Logo Image" class="w-20 h-20">
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

      <form method="POST" action="/" class="mt-16 w-full">
        <div class="flex flex-col mb-8">
          <label for="email" class="block text-negro mb-2">Email address</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Enter email address"
            class="w-full p-2 border border-gray-300 rounded-md"
            required
          >
        </div>

        <div class="relative">
          <label for="password" class="block text-negro mb-2">Password</label>
          <input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            placeholder="Enter your password"
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

        <div class="mt-8 flex justify-between items-center">
          <label class="inline-flex items-center">
            <input type="checkbox" class="mr-1">
            <span>Remember me</span>
          </label>
          <a href="/recover-password" class="text-primario">I forgot my password</a>
        </div>

        <input
          type="submit"
          value="Sign In"
          class="w-full mt-8 px-4 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                 hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
        >
      </form>
    </div>

    <div class="w-1/2 relative">
      <img src="../../static/login.png" alt="Logo Image" class="absolute inset-0 w-full h-full object-cover">
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },
  data () {
    return {
      showPassword: false,
      icons: {
        eye: faEye,
        eyeSlash: faEyeSlash
      }
    }
  }
}
</script>
