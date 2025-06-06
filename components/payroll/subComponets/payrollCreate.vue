<template>
  <div>
    <button
      class=" mb-3 w-52 py-3 text-xl text-left rounded-lg border hover:border-primario  <!-- Borde sutil que cambia en hover -->
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer
                group  <!-- Necesario para efectos hover -->"
      @click="navegateToBack"
    >
      <!-- Texto con gradiente -->
      <span
        class=" text-transparent bg-clip-text bg-gradient-to-r from-primario to-secundario  <!-- Gradiente en el texto --> group-hover:from-secundario group-hover:to-primario  <!-- Efecto hover (invierte colores) -->"
      >
        &#60; Back
      </span>
    </button>
    <v-card>
      <v-card-title class="flex flex-col pl-0" style="justify-content: flex-start !important; align-items: flex-start !important;">
        <div class="flex justify-start mb-9 p-8">
          <h1 class="text-left ml-0">
            Create Salary Definition
          </h1>
        </div>

        <div class="w-full p-8" style="justify-content: center !important; align-items: center !important;">
          <form action="POST" @submit.prevent="submitForm">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col">
                <label for="title" class="text-left block text-sm font-medium text-gray-700">Title</label>
                <select
                  id="title"
                  v-model="salary.title"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid text-left block text-sm font-medium text-gray-700"
                  required
                >
                  <option value="">
                    Select an Option
                  </option>
                  <option value="General Manager">
                    General Manager
                  </option>
                  <option value="Executive Director">
                    Executive Director
                  </option>
                  <option value="General Manager">
                    General Manager
                  </option>
                  <option value="Deputy General Manager">
                    Deputy General Manager
                  </option>
                  <option value="Asst. General Manager">
                    Asst. General Manager
                  </option>
                  <option value="Principal Manager">
                    Principal Manager
                  </option>
                  <option value="Senior Manager">
                    Senior Manager
                  </option>
                  <option value="Manager">
                    Manager
                  </option>
                  <option value="Deputy Manager">
                    Deputy Manager
                  </option>
                  <option value="Asst. Manager">
                    Asst. Manager
                  </option>
                  <option value="Snr. Executive Officer">
                    Snr. Executive Officer
                  </option>
                </select>
              </div> <!-- .title -->

              <div class="flex flex-col">
                <label for="level" class="text-left block text-sm font-medium text-gray-700">Level</label>
                <select
                  id="level"
                  v-model="salary.level"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid text-left block text-sm font-medium text-gray-700"
                  required
                >
                  <option value="">
                    Select an Option
                  </option>
                  <option value="MD/CEO">
                    MD/CEO
                  </option>
                  <option value="ED">
                    ED
                  </option>
                  <option value="GM">
                    GM
                  </option>
                  <option value="DGM">
                    DGM
                  </option>
                </select>
              </div> <!-- .Level -->

              <div class="flex flex-col mb-8">
                <label for="basicSalary" class="text-left block text-sm font-medium text-gray-700">Basic Salary</label>
                <input
                  id="basicSalary"
                  v-model="salary.basicSalary"
                  type="number"
                  min="0"
                  name="basicSalary"
                  placeholder="Enter amount in Naira"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Basic Salary-->
            </div> <!-- .grid primera fila-->

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col mb-8">
                <label for="allowance" class="text-left block text-sm font-medium text-gray-700">Allowance</label>
                <input
                  id="allowance"
                  v-model="salary.allowance"
                  type="number"
                  min="0"
                  name="allowance"
                  placeholder="Enter amount in Naira"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Allowance-->

              <div class="flex flex-col mb-8">
                <label for="grossSalary" class="text-left block text-sm font-medium text-gray-700">Gross Salary</label>
                <input
                  id="grossSalary"
                  v-model="salary.grossSalary"
                  type="number"
                  min="0"
                  name="grossSalary"
                  placeholder="Enter amount in Naira"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Allowance-->

              <div class="flex flex-col mb-8">
                <label for="deducion" class="text-left block text-sm font-medium text-gray-700">Deducions</label>
                <input
                  id="deducions"
                  v-model="salary.deduction"
                  type="number"
                  min="0"
                  name="deducion"
                  placeholder="Enter amount in Naira"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Allowance-->
            </div> <!-- .grid segunda fila-->

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div class="flex flex-col">
                <label for="netSalary" class="text-left block text-sm font-medium text-gray-700">Net Salary</label>
                <input
                  id="netSalary"
                  v-model="salary.netSalary"
                  type="number"
                  min="0"
                  name="netSalary"
                  placeholder="Enter amount in Naira"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                  disabled
                >
              </div> <!-- .Allowance-->

              <div class="flex justify-center items-center sm:items-end">
                <input
                  type="button"
                  value="Create Salary Definition"
                  class="w-full h-11 py-3 text-xs bg-gradient-to-r from-primario to-secundario rounded-lg
                   hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
                  style="color: white !important"
                  @click="submitForm"
                >
              </div>
            </div> <!-- .grid tercera fila-->
          </form>
        </div>
      </v-card-title>
    </v-card>
    <p class="text-sm text-center mt-24">
      Copyright © {{ CurrenYear }} Relia Energy. All Rights Reserved
    </p>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'PayrollCreate',
  data () {
    return {
      salary: {
        title: '',
        level: '',
        basicSalary: null,
        allowance: null,
        grossSalary: null,
        deduction: null,
        netSalary: null
      },
      CurrenYear: new Date().getFullYear()
    }
  },
  methods: {
    navegateToBack () {
      this.$router.push({ path: '/payroll' })
    },
    async submitForm () {
      // console.log('Desde API Backend')
      try {
        const response = await this.$axios.post('/salary-definitions/create',
          this.salary
        )
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Salary Definition created successfully'
          })
          // *** Emitir un evento para el componente padre ***
          this.$emit('salaryCreated') // * Emitimos un evento llamado 'salaryCreated'
          this.navegateToBack()
        }
        this.clearForm()
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while creating the salary definition.'
        })
      }
    },
    clearForm () {
      this.salary = {
        title: '',
        level: '',
        basicSalary: null,
        allowance: null,
        grossSalary: null,
        deduction: null,
        netSalary: null
      }
    }
  }
}
</script>
