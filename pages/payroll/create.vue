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
                >
                  <option value="">
                    Select an Option
                  </option>
                  <option value="Manager">
                    Manager
                  </option>
                  <option value="Developer">
                    Deveoloper
                  </option>
                </select>
              </div> <!-- .title -->

              <div class="flex flex-col">
                <label for="level" class="text-left block text-sm font-medium text-gray-700">Level</label>
                <select
                  id="level"
                  v-model="salary.level"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid text-left block text-sm font-medium text-gray-700"
                >
                  <option value="">
                    Select an Option
                  </option>
                  <option value="Junior">
                    Junior
                  </option>
                  <option value="Senior">
                    Senior
                  </option>
                </select>
              </div> <!-- .Level -->

              <div class="flex flex-col mb-8">
                <label for="basicSalary" class="text-left block text-sm font-medium text-gray-700">Basic Salary</label>
                <input
                  id="basicSalary"
                  v-model="salary.BasicSalary"
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
                  v-model="salary.Allowance"
                  type="text"
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
                  v-model="salary.GrossSalary"
                  type="text"
                  name="grossSalary"
                  placeholder="Enter amount in Naira"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Allowance-->

              <div class="flex flex-col mb-8">
                <label for="deducions" class="text-left block text-sm font-medium text-gray-700">Deducions</label>
                <input
                  id="deducions"
                  v-model="salary.Deduction"
                  type="text"
                  name="deducions"
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
                  v-model="salary.NetSalary"
                  type="text"
                  name="netSalary"
                  placeholder="Enter amount in Naira"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Allowance-->

              <div class="flex justify-center items-center sm:items-end">
                <input
                  type="button"
                  value="Create Salary Definition"
                  class="w-full h-11 py-3 text-xs bg-gradient-to-r from-primario to-secundario rounded-lg
                 hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
                  style="color: white !important"
                  @click="navegateToCreate"
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
export default {
  name: 'PayrollCreate',
  layout: 'principal',
  data () {
    return {
      salary: {
        title: '',
        level: '',
        BasicSalary: '',
        Allowance: '',
        GrossSalary: '',
        Deduction: '',
        NetSalary: ''
      },
      CurrenYear: new Date().getFullYear()
    }
  },
  methods: {
    navegateToBack () {
      this.$router.replace({ path: '/payroll' })
    }
  }
}
</script>
