<template>
  <v-app>
    <DashboardSidebarVue />
    <v-main class="bg-gray-fondo pa-4">
      <DashboardTopbarVue />
      <nuxt />
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
  }
}
</script>
