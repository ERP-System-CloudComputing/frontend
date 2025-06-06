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
            Generate Payroll
          </h1>
        </div>

        <div class="w-full p-8" style="justify-content: center !important; align-items: center !important;">
          <form action="POST" @submit.prevent="submitForm">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col mb-8">
                <label for="paymentName" class="text-left block text-sm font-medium text-gray-700">Payment Name</label>
                <input
                  id="paymentName"
                  v-model="paymentData.paymentName"
                  type="text"
                  name="paymentName"
                  placeholder="Enter payment name"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Allowance-->

              <div class="flex flex-col">
                <label for="designation" class="text-left block text-sm font-medium text-gray-700">Designation</label>
                <input
                  id="designation"
                  v-model="paymentData.Designation"
                  type="number"
                  min="0"
                  name="designation"
                  placeholder="Select Designation"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid text-left block text-sm font-medium text-gray-700"
                  required
                >
                </input>
              </div> <!-- .Designation -->

              <div class="flex flex-col mb-8">
                <label for="dateGenerate" class="text-left block text-sm font-medium text-gray-700">Date Generated</label>
                <input
                  id="dateGenerate"
                  v-model="paymentData.DateGenerated"
                  type="date"
                  name="dateGenerate"
                  :min="minDate"
                  placeholder="Enter a Date"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                  @input="validateDate"
                >
              </div> <!-- .Date Generated-->
            </div> <!-- .grid primera fila-->

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col mb-8">
                <label for="paymentMonth" class="text-left block text-sm font-medium text-gray-700">Payment Month</label>
                <input
                  id="paymentMonth"
                  v-model="paymentData.PaymentMonth"
                  type="number"
                  min="0"
                  name="paymentMonth"
                  placeholder="Select a month"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Payment Month-->

              <div class="flex flex-col mb-8">
                <label for="paymentYear" class="text-left block text-sm font-medium text-gray-700">Payment Year</label>
                <input
                  id="paymentYear"
                  v-model="paymentData.PaymentYear"
                  type="number"
                  min="0"
                  name="paymentYear"
                  placeholder="Selecte Year"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Payment Year-->
            </div>

            <!-- Tercer Fila para BOTON -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex justify-center items-center sm:items-end">
                <input
                  type="button"
                  value="Generate Payroll"
                  class="w-full h-11 py-3 text-xs bg-gradient-to-r from-primario to-secundario rounded-lg
                     hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
                  style="color: white !important"
                  @click="submitCreatePayroll"
                >
              </div>
            </div>
          </form>
        </div>
      </v-card-title>
    </v-card>

    <v-card class="mt-8">
      <v-card-title>
        Staff Details
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="computedTableData"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
      >
        <template #[`item.basicSalary`]="{ item }">
          {{ formatCurrency(item.basicSalary) }}
        </template>
        <template #[`item.allowance`]="{ item }">
          {{ formatCurrency(item.allowance) }}
        </template>
        <template #[`item.grossSalary`]="{ item }">
          {{ formatCurrency(item.grossSalary) }}
        </template>
        <template #[`item.deductions`]="{ item }">
          {{ formatCurrency(item.deductions) }}
        </template>
        <template #[`item.netSalary`]="{ item }">
          {{ formatCurrency(item.netSalary) }}
        </template>
        <template #[`item.actions`]="{ item }">
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <div class=" bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent  hover:from-blue-500 hover:to-blue-900 transition-all duration-300">
                <span
                  v-bind="attrs"
                  v-on="on"
                >
                  View More
                </span>
              </div>
            </template>
            <v-list>
              <v-list-item @click="editRow(item)">
                <v-list-item-title>
                  <v-icon small class="mr-2">
                    mdi-pencil
                  </v-icon>
                  Edit
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteRow(item)">
                <v-list-item-title>
                  <v-icon small class="mr-2">
                    mdi-delete
                  </v-icon>
                  Delete
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>

      <v-card class="p-6">
        <input
          type="button"
          value="Submit"
          class="w-52 py-3 text-xs bg-gradient-to-r from-primario to-secundario rounded-lg
                 hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
          style="color: white !important"
          @click="submitForm"
        >
      </v-card>
    </v-card>

    <p class="text-sm text-center mt-24">
      Copyright © {{ CurrenYear }} Relia Energy. All Rights Reserved
    </p>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'PayrollCreatePayroll',
  data () {
    return {
      CurrenYear: new Date().getFullYear(),
      paymentData: {
        paymentName: '',
        Designation: null,
        DateGenerated: this.getCurrentDate(),
        PaymentMonth: null,
        PaymentYear: null
      },
      minDate: '',
      search: '',
      headers: [
        { text: 'S/N', value: 'index', width: '60px' },
        { text: 'Staff Name', value: 'staffName', width: '120px' },
        { text: 'Title', value: 'title', width: '120px' },
        { text: 'Level', value: 'level', width: '100px' },
        { text: 'Basic Salary', value: 'basicSalary', width: '120px' },
        { text: 'Allowance', value: 'allowance', width: '120px' },
        { text: 'Gross Salary', value: 'grossSalary', width: '120px' },
        { text: 'Deductions', value: 'deductions', width: '120px' },
        { text: 'Net Salary', value: 'netSalary', width: '120px' },
        { text: 'Actions', value: 'actions', sortable: false, width: '160px' }
      ],
      tableData: [
        {
          title: 'Manager Director',
          staffName: 'Abubakar Alghazali',
          level: 'MD/CEO',
          basicSalary: 5000,
          allowance: 1000,
          deductions: 500
        },
        {
          title: 'Executive Director',
          staffName: 'Fatima Mohammed',
          level: 'ED',
          basicSalary: 3000,
          allowance: 500,
          deductions: 300
        },
        {
          title: 'General Manager',
          staffName: 'Ibrahim Bankole',
          level: 'GM',
          basicSalary: 2500,
          allowance: 400,
          deductions: 200
        }
      ]
    }
  },
  computed: {
    computedTableData () {
      return this.tableData.map((item, index) => ({
        ...item,
        index: index + 1,
        grossSalary: item.basicSalary + item.allowance,
        netSalary: (item.basicSalary + item.allowance) - item.deductions
      }))
    }
  },
  mounted () {
    this.minDate = this.getCurrentDate()
  },
  methods: {
    navegateToBack () {
      this.$router.push({ path: '/payroll' })
    },
    getCurrentDate () {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    validateDate () {
      if (!this.paymentData.DateGenerated) {
        return
      }
      const selectedDate = new Date(this.paymentData.DateGenerated)
      const today = new Date(this.minDate)

      if (selectedDate < today) {
      // * Si la fecha es anterior, reseteamos el campo
        this.paymentData.DateGenerated = this.minDate

        if (selectedDate < today) {
          const dateField = document.getElementById('dateGenerate')
          // ! Desenfoca el campo antes de cualquier otra acción
          dateField.blur()

          Swal.fire({
            icon: 'error',
            title: 'Invalid Date',
            text: 'Please select a date equal to or greater than today.'
          }).then(() => {
            // * Vuelve a establecer el valor en el campo después de cerrar el cuadro de diálogo
            this.paymentData.DateGenerated = this.minDate

            // Forzar reactividad y actualizar el campo
            this.$nextTick(() => {
              dateField.value = this.minDate // * actualiza el valor directamente en el DOM
            })
          })
        }
      }
    },
    formatCurrency (value) {
      return value ? `$${value.toLocaleString()}` : ''
    },
    editRow (item) {
      // console.log('Editing:', item)
      // this.$toast.info(`Editing ${item.title}`)
    },
    deleteRow (item) {
      // console.log('Deleting:', item)
      // this.$toast.error(`Deleting ${item.title}`)
    },
    submitCreatePayroll () {
      console.log('Generating Payroll API')
    },
    submitForm () {
      console.log('Desde el Backend')
    }
  }
}
</script>
