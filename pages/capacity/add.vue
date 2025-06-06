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
    <v-row class=" bg-white rounded-lg">
      <v-col cols="12">
        <label class="text-xl font-bold">
          Training Request
        </label>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="formValidar">
          <v-row>
            <v-col cols="12" md="4">
              <span>Training description</span>
              <v-text-field
                v-model="formData.trainDescription"
                placeholder="Enter description"
                outlined
                flat
                height="58"
                :rules="[required('Description')]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <span>Training Type</span>
              <v-select
                v-model="formData.trainType"
                placeholder="Select Type"
                outlined
                flat
                height="58"
                :rules="[required('Type')]"
                :items="selectTrainType"
                @input="typeSelectTeam()"
              />
            </v-col>
            <v-col cols="12" md="4">
              <span>Training Duration</span>
              <v-select
                v-model="formData.trainDuration"
                placeholder="Select Option"
                outlined
                flat
                height="58"
                :rules="[required('Duration')]"
                :items="selectTrainDuration"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <span>Training Date</span>
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
            <v-col cols="12" md="4">
              <span>Training Mode</span>
              <v-select
                v-model="formData.trainMode"
                placeholder="Select mode"
                outlined
                flat
                height="58"
                :rules="[required('Mode')]"
                :items="selectTrainMode"
              />
            </v-col>
            <v-col cols="12" md="4">
              <span>Staff to be trained</span>
              <div v-if="typeTeam === 'Individual'">
                <v-select
                  v-model="selectFormStaffs.staffID"
                  placeholder="Select names"
                  outlined
                  flat
                  height="58"
                  :rules="[required('Staff')]"
                  :items="selectTrainStaff"
                />
              </div>
              <div v-else>
                <v-select
                  v-model="selectFormStaffs.staffID"
                  placeholder="Select names"
                  outlined
                  flat
                  height="58"
                  multiple
                  :rules="[required('Staff')]"
                  :items="selectTrainStaff2"
                >
                  <template #selection="{ item, index }">
                    <v-chip
                      v-if="index < 2"
                      :key="index"
                      small
                      class="ma-1"
                      color="gray"
                      text-color="black"
                      :rules="[required('Staff')]"
                    >
                      {{ item }}
                    </v-chip>
                    <span
                      v-else-if="index === 2"
                      class="text-gray-400  text-caption align-self-center"
                    >
                      (+{{ selectFormStaffs.length - 2 }} others)
                    </span>
                  </template>
                </v-select>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" class="pb-10">
        <div class="sm:flex sm:space-x-7 sm:flex-row flex-col">
          <div class="md:w-72">
            <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="validForm()">
              Save and Submit
            </button>
          </div>
          <div class="md:w-72">
            <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="validForm()">
              Save
            </button>
          </div>
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
      selectTrainType: [
        'Individual',
        'Team'
      ],
      selectTrainMode: [
        'Physical',
        'Online'
      ],
      selectTrainStaff: [
        'Antonio Castillo',
        'Mario Cobian',
        'Luis Alvarez'
      ],
      selectTrainStaff2: [
        'Antonio Castillo',
        'Mario Cobian',
        'Luis Alvarez'
      ],
      selectTrainDuration: [
        '3 days',
        '5 days',
        '1 week',
        '2 weeks',
        '1 month',
        '3 months',
        '6 months'
      ],
      typeTeam: '',
      formData: {
        trainDescription: '',
        trainType: '',
        trainDuration: '',
        trainDate: '',
        trainMode: '',
        trainStatus: ''
      },
      selectAllStaff: [],
      selectFormStaffs: {
        staffID: ''
      },
      selectDate: '',
      formValidar: false
    }
  },
  methods: {
    goToAll () {
      this.$router.push('/capacity')
    },
    goToUpdate () {
      this.$router.push('/capacity/update')
    },
    typeSelectTeam () {
      this.typeTeam = this.formData.trainType
    },
    required (campo, min) {
      return (v) => {
        if (!v) { return `${campo} is Required` }
        if (v.length < min) { return `${campo} must be at least ${min} characters` }
        return true
      }
    },
    newDate (date) {
      return this.$dayjs(date).format('DD-MM-YYYY')
    },
    validForm () {
      if (this.$refs.form.validate()) {
        this.formData.trainDate = this.newDate(this.selectDate)
        this.createTeam()
        this.createCapacity()
      } else {
        alert('Complete all fields')
      }
    },
    createTeam () {
      if (this.typeTeam === 'Team' && Array.isArray(this.selectFormStaffs.staffID)) {
        const newStaffs = this.selectFormStaffs.staffID.map(staff => ({ staffID: staff }))
        this.selectAllStaff.push(...newStaffs)
      } else if (this.typeTeam === 'Individual' && this.selectFormStaffs.staffID) {
        this.selectAllStaff.push({ staffID: this.selectFormStaffs.staffID })
      }
      this.selectFormStaffs = { staffID: this.typeTeam === 'Team' ? [] : '' }
    },
    async createCapacity () {
      try {
        const capacityFull = {
          capacity: this.formData,
          dataList: this.selectAllStaff
        }
        await this.$axios.post('/capacity/create', capacityFull)
        alert('Success')
        this.$router.push('/capacity')
      } catch (error) {
        // console.log(error)
        const errorMessage = error.message || 'Error Capacity'
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
