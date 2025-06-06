<template>
  <v-container class="space-y-7">
    <v-row>
      <MaintenanceCards :count-status-type="countStatusType" />
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
        <div
          class="pa-4 h-72 overflow-y-auto border-l-2"
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
                  <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="showCita(cita)">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="confirmDialog"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-title>
          Create Payment Voucher
        </v-card-title>
        <v-card-text v-if="selectedCita">
          <v-form ref="form" v-model="formValidar">
            <v-row>
              <v-col cols="12" md="2">
                <label class="text-black font-bold block">Item name</label>
                <strong> {{ selectedCita.itemName }} </strong>
              </v-col>
              <v-col cols="12" md="2">
                <label class="text-black font-bold block">Number</label>
                <strong> {{ selectedCita.number }} </strong>
              </v-col>
              <v-col cols="12" md="2">
                <label class="text-black font-bold block">Date</label>
                <strong> {{ selectedCita.date }} </strong>
              </v-col>
              <v-col cols="12" md="2">
                <label class="text-black font-bold block">Maintenance type</label>
                <strong> {{ selectedCita.maintenanceType }} </strong>
              </v-col>
              <v-col cols="12" md="2">
                <label class="text-black font-bold block">Recurring type</label>
                <strong> {{ selectedCita.recurring }} </strong>
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="selectedCita.status"
                  placeholder="Select Option"
                  outlined
                  flat
                  height="58"
                  :rules="[required()]"
                  :items="selectTypeMain"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <div class="flex space-x-4">
            <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-red-800 hover:from-red-900 shadow-md p-4" @click="closeDialog()">
              Cancel
            </button>
            <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="validForm()">
              Attach Payment Invoice
            </button>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import MaintenanceCards from '~/components/maintenance/MaintenanceCards.vue'
export default {
  components: {
    MaintenanceCards
  },
  layout: 'principal',
  data () {
    return {
      selectedDate: new Date(),
      selectTypeMain: [
        'Scheduled',
        'Completed',
        'Pending',
        'Overdue'
      ],
      formValidar: false,
      allMaintenances: [],
      all: [],
      confirmDialog: false,
      selectedCita: null,
      countStatusType: {
        Scheduled: 0,
        Completed: 0,
        Pending: 0,
        Overdue: 0
      }
    }
  },
  watch: {
    selectedDate () {
      this.getMaintenancesByDate()
    }
  },
  mounted () {
    this.getAllMaintenances()
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
    required (campo, min) {
      return (v) => {
        if (!v) { return `${campo} is Required` }
        if (v.length < min) { return `${campo} must be at least ${min} characters` }
        return true
      }
    },
    showCita (cita) {
      this.selectedCita = cita
      this.confirmDialog = true
    },
    closeDialog () {
      this.confirmDialog = false
      this.formValidar = false
      this.getAllMaintenances()
    },
    getStatus (maintenance) {
      return maintenance.reduce((act, item) => {
        const status = item.status
        act[status] = (act[status] || 0) + 1
        return act
      }, {})
    },
    validForm () {
      if (this.$refs.form.validate()) {
        const isFormatted = /^\d{2}-\d{2}-\d{4}$/.test(this.selectedCita.date)
        if (!isFormatted) {
          this.selectedCita.date = dayjs(this.selectedCita.date, 'Do MMMM, YYYY').format('DD-MM-YYYY')
        }
        this.updateStatus()
      } else {
        alert('Complete all fields')
      }
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
    },
    async getAllMaintenances () {
      try {
        const response = await this.$axios.get('/maintenance/getAll')
        this.all = response.data
          ? response.data.map(item => ({
            ...item
          }))
          : []
        this.countStatusType = this.getStatus(this.all)
      } catch (error) {
        console.log(error)
      }
    },
    async updateStatus () {
      try {
        await this.$axios.put(`/maintenance/update/${this.selectedCita.id}`, this.selectedCita)
        alert('Success')
        this.$router.push('/maintenance')
        this.closeDialog()
      } catch (error) {
        // console.log(error)
        const errorMessage = error.message || 'Error Maintenance'
        this.$store.dispatch('alert/triggerAlert', {
          message: errorMessage,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
