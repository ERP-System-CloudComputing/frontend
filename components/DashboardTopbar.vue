<template>
  <v-app-bar app flat color="transparent" class="py-6 h-auto">
    <div class="flex flex-col">
      <div class="flex items-center">
        <v-icon v-if="pageDetails().icon" class="mr-2" color="blue darken-4">
          {{ pageDetails().icon }}
        </v-icon>
        <h1 class="font-extrabold text-xl">
          {{ pageDetails().title }}
        </h1>
      </div>
      <span class="font-normal text-sm mt-1">{{ pageDetails().subtitle }}</span>
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
export default {
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
        budget: {
          icon: 'mdi-piggy-bank',
          title: 'Office Budget',
          subtitle: 'View, create and send budget request.'
        }
      }

      return titles[route]
    },
    logout () {
      console.log('Logout')
    }
  }
}
</script>

<style scoped>
.contenedor-texto {
  flex: none !important;
}
</style>
