<template>
  <v-app-bar
    app
    flat
    color="white"
    class="pt-6 pb-2 bg-white header"
  >
    <v-btn v-if="isMobile" icon @click="$emit('toggle-sidebar')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <div class="flex flex-col">
      <div class="flex items-center">
        <v-icon v-if="pageDetails().icon" class="mr-2" color="blue darken-4">
          {{ pageDetails().icon }}
        </v-icon>
        <h1 class="font-extrabold text-xl">
          {{ pageDetails().title }}
        </h1>
      </div>
      <span v-if="!isMobile" class="font-normal text-sm mt-1">{{ pageDetails().subtitle }}</span>
    </div>

    <v-spacer />

    <div class="flex contenedor-texto">
      <button class="mr-3">
        <v-icon color="black">
          mdi-bell
        </v-icon>
      </button>

      <v-menu
        offset-y
        transition="slide-y-transition"
      >
        <template #activator="{ on, attrs }">
          <div class="flex justify-center items-center">
            <v-avatar size="32" class="mr-4">
              <img src="https://i.pravatar.cc/300" alt="Avatar">
            </v-avatar>
            <div class="flex-none flex flex-col items-start mr-4">
              <span class="inline-block text-sm">Otor John</span>
              <span class="inline-block text-xs text-gray-500">HR Office</span>
            </div>
            <button class="hover:bg-gray-300 p-1 transition rounded-sm" v-bind="attrs" v-on="on">
              <v-icon color="black">
                mdi-chevron-down
              </v-icon>
            </button>
          </div>
        </template>

        <div class="bg-white shadow-md rounded-md py-2">
          <nuxt-link
            to="profile"
          >
            <div class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <v-icon class="mr-2" color="black">
                mdi-account
              </v-icon>
              <span class="text-sm text-black">Profile</span>
            </div>
          </nuxt-link>
          <nuxt-link
            to="settings"
          >
            <div class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <v-icon class="mr-2" color="black">
                mdi-cog
              </v-icon>
              <span class="text-sm text-black">Settings</span>
            </div>
          </nuxt-link>
          <div class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="logout">
            <v-icon class="mr-2" color="black">
              mdi-logout
            </v-icon>
            <span class="text-sm">Logout</span>
          </div>
        </div>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import swal from 'sweetalert2'

export default {
  props: {
    isMobile: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    currentDate () {
      const now = new Date()

      const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' })
      const day = now.getDate()
      const month = now.toLocaleDateString('en-GB', { month: 'long' })
      const year = now.getFullYear()

      return `Today is ${weekday}, ${day} ${month} ${year}.`
    },
    pageDetails () {
      const route = this.$route.name

      const titles = {
        dashboard: {
          title: 'Welcome, Mr. Otor John 👋',
          subtitle: this.currentDate()
        },
        staff: {
          icon: 'mdi-account-group',
          title: 'All Staff',
          subtitle: 'View, search for and add new staff'
        },
        'staff-add': {
          icon: 'mdi-account-plus',
          title: 'Add Staff',
          subtitle: 'Fill out the form to create a new staff member.'
        },
        budget: {
          icon: 'mdi-piggy-bank',
          title: 'Office Budget',
          subtitle: 'View, create and send budget request.'
        },
        'budget-create': {
          icon: 'mdi-piggy-bank',
          title: 'Create Budget',
          subtitle: 'Create and send budget request.'
        },
        circulars: {
          icon: 'mdi-receipt-text',
          title: 'Circulars',
          subtitle: 'Search for  and view all circulars.'
        },
        'circulars-create': {
          icon: 'mdi-receipt-text',
          title: 'Create Circulars',
          subtitle: 'Create and send circulars to designated offices.'
        },
        payroll: {
          icon: 'mdi-cash-multiple',
          title: 'Add Staff',
          subtitle: 'Generate and send payroll to account.'
        }
      }

      return titles[route]
    },
    async logout () {
      try {
        // console.log('Cookie antes de enviar: ', document.cookie)
        const confirmDialog = await swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out of the system.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout!'
        })

        if (!confirmDialog.isConfirmed) {
          return
        }

        // * 1. Hacemos peticion a backend:
        await this.$axios.post('/staff/logout', {
          withCredentials: true // * Enviamos credenciales al servido
        })

        // console.log('Respuesta del servidor: ', response.data) // * Respuesta del servidor

        // * 2. Limpiamos almacenamiento local:
        localStorage.removeItem('auth._token.local')
        localStorage.removeItem('auth._token_expiration.local')
        sessionStorage.clear()

        // * 4. Rediridimos al user a login:
        await this.$router.push('/')
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
        // console.error('Error al cerrar sesión: ', error)
        // console.error('Error completo: ', error.response)
      }
    }
  }
}
</script>

<style scoped>
.contenedor-texto {
  flex: none !important;
}
.header {
  height: auto !important;
}
</style>
