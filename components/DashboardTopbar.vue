<template>
  <v-app-bar app flat color="transparent" class="py-6">
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

      <div class="flex justify-center items-center">
        <v-avatar size="32" class="mr-4">
          <img src="https://i.pravatar.cc/300" alt="Avatar">
        </v-avatar>
        <div class="flex-none flex flex-col items-start mr-4">
          <span class="inline-block text-sm">Otor John</span>
          <span class="inline-block text-xs text-gray-500">HR Office</span>
        </div>
        <button class="hover:bg-gray-300 p-1 transition rounded-sm">
          <v-icon color="black">
            mdi-chevron-down
          </v-icon>
        </button>
      </div>
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
        }
      }

      return titles[route] || {}
    }
  }
}
</script>

<style scoped>
.contenedor-texto {
  flex: none !important;
}
</style>
