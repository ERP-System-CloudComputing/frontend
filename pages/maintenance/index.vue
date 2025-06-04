<template>
  <v-container>
    <v-row>
      <DashboardCardsVue />
    </v-row>
    <v-row />
    <v-row />
  </v-container>
</template>

<script>
import DashboardCardsVue from '~/components/dashboard/DashboardCards.vue'
export default {
  components: {
    DashboardCardsVue
  },
  layout: 'principal'
}
</script>

<style scoped>
</style>
