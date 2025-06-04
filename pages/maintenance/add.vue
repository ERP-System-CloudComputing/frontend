<template>
  <v-container fluid>
    <v-row>
      <button class="flex pb-4" @click="goToAll()">
        <v-icon class="bg-gradient-to-b from-primario to-secundario bg-clip-text text-transparent">
          mdi-arrow-left
        </v-icon>
        <span class="text-lg bg-gradient-to-r from-primario to-secundario bg-clip-text text-transparent">Back</span>
      </button>
    </v-row>
    <v-row class="bg-white rounded-lg">
      <v-col cols="12">
        <span class="font-bold text-lg block pb-4">Schedule Maintenance</span>
        <span>Kindly fill in the form below to schedule a maintenance</span>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="formValidar">
          <v-row>
            <v-col cols="12" md="4">
              <span>Item name</span>
              <v-select
                v-model="formData.itemName"
                placeholder="Select item"
                outlined
                flat
                height="58"
                :rules="[required('item')]"
                :items="selectItems"
              />
            </v-col>
            <v-col cols="12" md="4">
              <span>Number</span>
              <v-select
                v-model="formData.number"
                placeholder="Select Option"
                outlined
                flat
                height="58"
                :rules="[required('Number')]"
                :items="[1,2,3,4,5,6,7,8,9]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <span>Date</span>
              <v-text-field
                v-model="selectDate"
                placeholder="DD/MM/YYYY"
                outlined
                dense
                type="date"
                height="58"
                :rules="[required('Date')]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <span>Maintenance type</span>
              <v-select
                v-model="formData.maintenanceType"
                placeholder="Select Option"
                outlined
                flat
                height="58"
                :rules="[required('Maintenance')]"
                :items="selectMaintenanceType"
              />
            </v-col>
            <v-col cols="12" md="4">
              <span>Recurring option</span>
              <v-select
                v-model="formData.recurring"
                placeholder="Select Option"
                outlined
                flat
                height="58"
                :rules="[required('Recurring')]"
                :items="selectRecurrings"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" class="pb-10">
        <div class="sm:w-72">
          <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="validForm()">
            Schedule Maintenance
          </button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      formValidar: false,
      selectItems: [
        'Samsung',
        'Refrigerator',
        'Stove',
        'Machinery',
        'Lenovo',
        'Tools',
        'Air Conditioner',
        'Furniture',
        'Floors',
        'Tiles',
        'Other'
      ],
      selectRecurrings: [
        'every week',
        'every month',
        'every two months',
        'every six months'
      ],
      selectMaintenanceType: [
        'Preventive',
        'Recurring',
        'Periodic',
        'New',
        'Damaged',
        'Dangerous'
      ],
      selectItem: '',
      selectNumber: 1,
      selectDate: '',
      selectMaintenance: '',
      selectRecurring: '',
      formData: {
        itemName: '',
        number: '',
        date: '',
        maintenanceType: '',
        recurring: ''
      }
    }
  },
  methods: {
    goToAll () {
      this.$router.push('/maintenance')
    },
    newFormat (date) {
      if (!date) { return '' }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    required (campo, min) {
      return (v) => {
        if (!v) { return `${campo} is Required` }
        if (v.length < min) { return `${campo} must be at least ${min} characters` }
        return true
      }
    },
    validForm () {
      if (this.$refs.form.validate()) {
        this.formData.date = this.newFormat(this.selectDate)
        console.log(this.formData)
        this.createMaintenance()
      } else {
        alert('Complete all fields')
      }
    },
    async createMaintenance () {
      try {
        console.log(this.formData)
        await this.$axios.post('/maintenance/create', this.formData)
        alert('Success')
        this.$router.push('/maintenance')
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
