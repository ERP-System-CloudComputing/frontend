<template>
  <v-app>
    <DashboardSidebarVue />
    <DashboardTopbarVue />

    <v-main class="bg-grey-lighten-4 pa-4">
      <slot />
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
