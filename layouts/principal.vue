<template>
  <v-app>
    <DashboardSidebarVue />
    <DashboardTopbarVue />

    <v-main class="bg-gray-fondo mt-10">
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
  }
}
</script>
