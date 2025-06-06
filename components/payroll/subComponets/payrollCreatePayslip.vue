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
        <div class="flex justify-start mb-2 p-8">
          <h1 class="text-left ml-0">
            Create Payslip
          </h1>
        </div>
      </v-card-title>

      <div class="w-full p-8" style="justify-content: center !important; align-items: center !important;">
        <form action="POST" @submit.prevent="submitForm">
          <!-- Seccion 1 - Basic Information -->
          <div class="mb-12">
            <h2 class="text-xl font-semibold mb-2 pd-2 border-b border-gray-200">
              Basic Information
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col">
                <label for="name" class="text-left block text-sm font-medium text-gray-700">Staff Name</label>
                <select
                  id="name"
                  v-model="salary.staffName"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid text-left block text-sm font-medium text-gray-700"
                >
                  <option value="">
                    Select Staff
                  </option>
                  <option value="Manager">
                    Name 1
                  </option>
                  <option value="Developer">
                    Name 2
                  </option>
                </select>
              </div> <!-- .staff Name -->

              <div class="flex flex-col">
                <label for="title" class="text-left block text-sm font-medium text-gray-700">Title</label>
                <select
                  id="title"
                  v-model="salary.title"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid text-left block text-sm font-medium text-gray-700"
                >
                  <option value="">
                    Select Title
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
                    Select Level
                  </option>
                  <option value="Junior">
                    Junior
                  </option>
                  <option value="Senior">
                    Senior
                  </option>
                </select>
              </div> <!-- .Level -->
            </div> <!-- .grid primera fila -->
          </div> <!-- .Seccion 1 -->

          <!-- Seccion 2 - Salary Structure -->
          <div class="mb-12">
            <h2 class="text-xl font-semibold mb-2 pd-2 border-b border-gray-200">
              Salary Structure
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col mb-8">
                <label for="basicSalary" class="text-left block text-sm font-medium text-gray-700">Basic Salary</label>
                <input
                  id="basicSalary"
                  v-model="salary.BasicSalary"
                  type="number"
                  min="0"
                  name="basicSalary"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Basic Salary-->

              <div class="flex flex-col mb-8">
                <label for="housingAllowance" class="text-left block text-sm font-medium text-gray-700">Housing Allowance</label>
                <input
                  id="housingAllowance"
                  v-model="salary.HousingAllowance"
                  type="number"
                  min="0"
                  name="housingAllowance"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Housing Allowance-->

              <div class="flex flex-col mb-8">
                <label for="transportAllowance" class="text-left block text-sm font-medium text-gray-700">Transport Allowance</label>
                <input
                  id="transportAllowance"
                  v-model="salary.TransportAllowance"
                  type="number"
                  min="0"
                  name="transportAllowance"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Transport Allowance-->

              <div class="flex flex-col mb-8">
                <label for="utilityAllowance" class="text-left block text-sm font-medium text-gray-700">Utility Allowance</label>
                <input
                  id="utilityAllowance"
                  v-model="salary.UtilityAllowance"
                  type="number"
                  min="0"
                  name="utilityAllowance"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Utility Allowance-->

              <div class="flex flex-col mb-8">
                <label for="productivityAllowance" class="text-left block text-sm font-medium text-gray-700">Productivity Allowance</label>
                <input
                  id="productivityAllowance"
                  v-model="salary.ProductivityAllowance"
                  type="number"
                  min="0"
                  name="productivityAllowance"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Productivity Allowance-->

              <div class="flex flex-col mb-8">
                <label for="comunicationAllowance" class="text-left block text-sm font-medium text-gray-700">Comunication Allowance</label>
                <input
                  id="comunicationAllowance"
                  v-model="salary.ComunicationAllowance"
                  type="number"
                  min="0"
                  name="comunicationAllowance"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Comunication Allowance-->

              <div class="flex flex-col mb-8">
                <label for="incovenienceAllowance" class="text-left block text-sm font-medium text-gray-700">Incovenience Allowance</label>
                <input
                  id="incovenienceAllowance"
                  v-model="salary.IncovenienceAllowance"
                  type="number"
                  min="0"
                  name="incovenienceAllowance"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Allowance-->

              <div class="flex flex-col mb-8">
                <label for="grossSalary" class="text-left block text-sm font-medium text-gray-700">Gross Salary</label>
                <input
                  id="grossSalary"
                  v-model="salary.GrossSalary"
                  type="number"
                  min="0"
                  name="grossSalary"
                  placeholder="Amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid bg-gray-200"
                  required
                >
              </div> <!-- .Allowance-->
            </div> <!-- .Seccion 2-->
          </div>

          <!-- Seccion 3 - Deductions -->
          <div class="mb-12">
            <h2 class="text-xl font-semibold mb-2 pd-2 border-b border-gray-200">
              Deductions
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col mb-8">
                <label for="tax" class="text-left block text-sm font-medium text-gray-700">TAX/PAYE</label>
                <input
                  id="tax"
                  v-model="salary.TaxPAYE"
                  type="number"
                  min="0"
                  name="tax"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .TAX/PAYE-->

              <div class="flex flex-col mb-8">
                <label for="employee" class="text-left block text-sm font-medium text-gray-700">Employee Pension</label>
                <input
                  id="employee"
                  v-model="salary.EmployeePension"
                  type="number"
                  min="0"
                  name="employee"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Employee Pnsion-->

              <div class="flex flex-col mb-8">
                <label for="totaldeducions" class="text-left block text-sm font-medium text-gray-700">Total Deductions</label>
                <input
                  id="totaldeducions"
                  v-model="salary.TotalDeductions"
                  type="number"
                  min="0"
                  name="totaldeducions"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid bg-gray-200"
                  required
                >
              </div> <!-- .Total Deductions-->
            </div>
          </div> <!--.Seccion 3 -->

          <!-- Seccion 4 - Net Salary -->
          <div class="mb-12">
            <h2 class="text-xl font-semibold mb-2 pd-2 border-b border-gray-200">
              Net Salary
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col mb-8">
                <label for="neySalary" class="text-left block text-sm font-medium text-gray-700">Net Salary</label>
                <input
                  id="neySalary"
                  v-model="salary.NetSalary"
                  type="number"
                  min="0"
                  name="neySalary"
                  placeholder="Enter amount"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid bg-gray-200"
                  required
                >
              </div> <!-- .Allowance-->
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div class="flex justify-center items-center sm:items-end">
                <input
                  type="button"
                  value="Create Payslip"
                  class="w-full h-11 py-3 text-xs bg-gradient-to-r from-primario to-secundario rounded-lg
                     hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
                  style="color: white !important"
                  @click.prevent="SubmitFormCreatePaySlip"
                >
              </div>
            </div> <!-- .grid tercera fila-->
          </div> <!--.Seccion 4 -->
        </form>
      </div>
    </v-card>
    <p class="text-sm text-center mt-24">
      Copyright © {{ CurrenYear }} Relia Energy. All Rights Reserved
    </p>
  </div>
</template>

<script>
export default {
  name: 'PayrollCreate',
  data () {
    return {
      salary: {
        staffName: '',
        title: '',
        level: '',
        BasicSalary: null,
        HousingAllowance: null,
        TransportAllowance: null,
        UtilityAllowance: null,
        ProductivityAllowance: null,
        ComunicationAllowance: null,
        IncovenienceAllowance: null,
        GrossSalary: null,
        TaxPAYE: null,
        EmployeePension: null,
        TotalDeductions: null,
        NetSalary: null
      },
      CurrenYear: new Date().getFullYear()
    }
  },
  methods: {
    navegateToBack () {
      this.$router.push({ path: '/payroll' })
    },
    SubmitFormCreatePaySlip () {
      console.log('Dsde Backend')
    }
  }
}
</script>
