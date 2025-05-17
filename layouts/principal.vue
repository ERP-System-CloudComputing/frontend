<template>
  <v-app>
    <DashboardSidebarVue :is-mobile="isMobile" :drawer="drawer" @update:drawer="drawer = $event" />
    <DashboardTopbarVue :is-mobile="isMobile" @toggle-sidebar="toggleDrawer" />

    <v-main class="bg-gray-fondo mt-12">
      <div class="mx-4">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import DashboardSidebarVue from '~/components/DashboardSidebar.vue'
import DashboardTopbarVue from '~/components/DashboardTopbar.vue'

export default {
  components: {
    DashboardSidebarVue,
    DashboardTopbarVue
  },
  data () {
    return {
      drawer: false,
      isMobile: false
    }
  },
  mounted () {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile () {
      console.log('rezise...')
      this.isMobile = window.innerWidth < 960 // o el breakpoint que quieras
      if (this.isMobile) {
        this.drawer = false
      } else {
        this.drawer = true
      }
    },
    toggleDrawer () {
      console.log('funciona')
      this.drawer = !this.drawer
    }
  }
}
</script>
