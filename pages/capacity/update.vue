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
    <v-row class="rounded-lg bg-white">
      <v-col cols="12">
        <label class="font-bold text-xl">
          Staff Health and Safety Training
        </label>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="3">
            <label class="text-sm block">
              Training type
            </label>
            <strong>
              {{ formData.trainType }} training
            </strong>
          </v-col>
          <v-col cols="12" md="3">
            <label class="text-sm  block">
              Training duration
            </label>
            <strong>
              {{ formData.trainDuration }}
            </strong>
          </v-col>
          <v-col cols="12" md="3">
            <label class="text-sm block">
              Training mode
            </label>
            <strong>
              {{ formData.trainMode }}
            </strong>
          </v-col>
          <v-col cols="12" md="3">
            <label class="text-sm block">
              Training status
            </label>
            <strong>
              {{ formData.trainStatus }}
            </strong>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div
              class="pa-4 max-h-64 overflow-y-auto"
              elevation="2"
              style="height: 300px; overflow-y: auto;"
            >
              <div v-if="capacityStaffs.length === 0">
                <p class="text-center font-bold">
                  There are no Staffs
                </p>
              </div>
              <div v-else>
                <div v-for="(staff, index) in capacityStaffs" :key="index" class="mb-2">
                  <div class="pb-4">
                    <label class="text-sm block"> {{ staff.date }}</label>
                    <span class="font-bold"> {{ index + 1 }}. {{ staff.staffID }} </span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <div class="">
              <label>
                Update status
              </label>
              <v-select
                v-model="formData.trainStatus"
                placeholder="Select Option"
                outlined
                flat
                height="55"
                :items="selectStatus"
              />
            </div>
          </v-col>
          <v-col cols="12" md="6" class="pb-10">
            <div class="md:w-72">
              <button class=" text-white w-full sm:mt-5 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="updateStatus()">
                Update
              </button>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      formData: [],
      capacityStaffs: [],
      selectStatus: [
        'Inprogress',
        'To-do',
        'Completed'
      ]
    }
  },
  mounted () {
    this.getCapacity()
    this.getCapacityStaffs()
  },
  methods: {
    goToAll () {
      this.$router.push('/capacity')
    },
    async getCapacity () {
      try {
        const response = await this.$axios.get(`/capacity/getById/${this.$route.query.id}`)
        this.formData = response.data
      } catch (error) {
        // console.log()
      }
    },
    async getCapacityStaffs () {
      try {
        const response = await this.$axios.get(`/capacity/getByCapacityID/${this.$route.query.id}`)
        this.capacityStaffs = response.data
          ? response.data.map(item => ({
            ...item
          }))
          : []
      } catch (error) {
        // console.log()
      }
    },
    async updateStatus () {
      try {
        await this.$axios.put(`/capacity/update/${this.$route.query.id}`, this.formData)
        alert('Success')
        this.$router.push('/capacity')
        this.closeDialog()
      } catch (error) {
        // console.log(error)
        const errorMessage = error.message || 'Error capacity'
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
