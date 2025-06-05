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
    <v-row class="bg-white rounded-lg">
      <v-col cols="12">
        <span class="font-bold text-xl">
          Scheduled Maintenance
        </span>
      </v-col>
      <v-col cols="12" sm="6" class="flex justify-center">
        <div class="flex justify-center">
          <vc-date-picker
            v-model="selectedDate"
            class="flex"
            color="blue"
          />
        </div>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card
          class="pa-4"
          elevation="2"
          style="height: 270px; overflow-y: auto;"
        >
          <div v-if="allMaintenances.length === 0">
            <p class="text-center font-bold">
              There are no appointments for this date
            </p>
          </div>
          <div v-else>
            <div v-for="(cita, index) in allMaintenances" :key="index" class="mb-2">
              <div class="pb-4">
                <label class="text-sm block"> {{ cita.date }}</label>
                <span class="font-bold"> {{ index + 1 }} Schedule maintenance for service of {{ cita.number }} unit of {{ cita.itemName }}</span>
                <div class="flex space-x-4 w-32 justify-items-center">
                  <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="showDetails()">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import DashboardCardsVue from '~/components/dashboard/DashboardCards.vue'
export default {
  components: {
    DashboardCardsVue
  },
  layout: 'principal',
  data () {
    return {
      selectedDate: new Date(),
      allMaintenances: []

    }
  },
  watch: {
    selectedDate () {
      this.getMaintenancesByDate()
    }
  },
  methods: {
    goToAdd () {
      this.$router.push('/maintenance/add')
    },
    NewDate (date) {
      return this.$dayjs(date).format('DD-MM-YYYY')
    },
    fullDate (date) {
      return dayjs(date, 'DD-MM-YYYY').format('Do MMMM, YYYY')
    },
    async getMaintenancesByDate () {
      try {
        const date = this.NewDate(this.selectedDate)
        const response = await this.$axios.get(`/maintenance/getByDate/${date}`)
        this.allMaintenances = response.data
          ? response.data.map(item => ({
            ...item,
            date: this.fullDate(item.date)
          }))
          : []
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
</style>
