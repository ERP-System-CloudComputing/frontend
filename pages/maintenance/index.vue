<template>
  <v-container class="space-y-7">
    <v-row>
      <DashboardCardsVue />
    </v-row>
    <v-row class="bg-white rounded-lg">
      <v-col cols="12" class="flex sm:flex-row flex-col sm:justify-between items-center">
        <span class="font-bold text-xl">
          Schedule a Maintenance
        </span>
        <div class="sm:w-72">
          <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="goToAdd()">
            Schedule Maintenance
          </button>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="font-bold text-xl">
          Scheduled Maintenance
        </span>
      </v-col>
      <v-col cols="12" sm="6" class="flex justify-center">
        <div class="lg:flex lg:w-full px-28">
          <vc-date-picker
            class="lg:flex"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        asdasda
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardCardsVue from '~/components/dashboard/DashboardCards.vue'
export default {
  components: {
    DashboardCardsVue
  },
  layout: 'principal',
  data () {
    return {

    }
  },
  methods: {
    goToAdd () {
      this.$router.push('/maintenance/add')
    }
  }
}
</script>

<style>
</style>
