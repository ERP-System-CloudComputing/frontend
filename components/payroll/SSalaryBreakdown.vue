<template>
  <v-card>
    <v-card-title>
      Salary Definition
      <v-spacer />
      <input
        type="button"
        value="Create Salary Definition"
        class="w-52 py-3 text-xs bg-gradient-to-r from-primario to-secundario rounded-lg
                 hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
        style="color: white !important"
        @click="navegateToCreate"
      >
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
      <template #[`item.deduction`]="{ item }">
        {{ formatCurrency(item.deduction) }}
      </template>
      <template #[`item.netSalary`]="{ item }">
        {{ formatCurrency(item.netSalary) }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn
          small
          color="primary"
          class="mr-2"
          @click="editRow(item)"
        >
          Edit
        </v-btn>
        <v-btn
          small
          color="error"
          @click="deleteRow(item)"
        >
          Delete
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'PayrollTable',
  //* Hook de navegación para recargar datos cuando se vuelve a esta ruta
  beforeRouteEnter (to, from, next) {
    // Se ejecuta antes de que la ruta sea confirmada y el componente sea creado/reutilizado
    // `vm` no está disponible aquí, por eso se usa `next(vm => ...)`.
    next(async (vm) => {
      // Si venimos de la ruta de creación de salario y el componente se está reutilizando, recarga.
      // Puedes ser más específico aquí si quieres, por ejemplo, solo recargar si 'from.path' es '/payroll/create'
      await vm.fetchSalaryDefinitions()
    })
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'S/N', value: 'index', width: '60px' },
        { text: 'Title', value: 'title', width: '120px' },
        { text: 'Level', value: 'level', width: '100px' },
        { text: 'Basic Salary', value: 'basicSalary', width: '120px' },
        { text: 'Allowance', value: 'allowance', width: '120px' },
        { text: 'Gross Salary', value: 'grossSalary', width: '120px' },
        { text: 'Deductions', value: 'deduction', width: '120px' },
        { text: 'Net Salary', value: 'netSalary', width: '120px' },
        { text: 'Actions', value: 'actions', sortable: false, width: '160px' }
      ],
      tableData: [] // * Arreglo para almacenar las definiciones de salario de la API
    }
  },
  computed: {
    computedTableData () {
      return this.tableData.map((item, index) => ({
        ...item,
        index: index + 1,
        grossSalary: item.basicSalary + item.allowance,
        netSalary: (item.basicSalary + item.allowance) - item.deduction
      }))
    }
  },
  // Hook de ciclo de vida para cargar los datos cuando el componente es creado
  async created () {
    await this.fetchSalaryDefinitions()
  },
  methods: {
    navegateToCreate () {
      // this.$router.push({ name: 'PayrollCreate' })
      this.$router.push({ path: '/payroll/create' })
    },
    formatCurrency (value) {
      const numericValue = parseFloat(value) // * Siempre convertimos a numeto

      if (isNaN(numericValue)) {
        return '$0'
      }
      return `$${numericValue.toLocaleString()}`
    },
    editRow (item) {
      // console.log('Editing:', item)
      // this.$toast.info(`Editing ${item.title}`)
    },
    async deleteRow (item) {
      // console.log('Deleting:', item)
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete the salary definition for ${item.title}. This action cannot be undone!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })
      if (result.isConfirmed) {
        try {
          // Asumiendo que tienes un endpoint DELETE en tu backend
          await this.$axios.delete(`/api/salary-definitions/${item.id}`) // Ajusta la URL si es necesario
          Swal.fire(
            'Deleted!',
            'The salary definition has been deleted.',
            'success'
          )
          // Vuelve a cargar los datos para actualizar la tabla
          await this.fetchSalaryDefinitions()
        } catch (error) {
          // console.error('Error deleting salary definition:', error.response ? error.response.data : error.message)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while deleting the salary definition.'
          })
        }
      }
    },
    async fetchSalaryDefinitions () {
      try {
        const response = await this.$axios.get('/salary-definitions/users')
        this.tableData = response.data
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching salary definitions.'
        })
      }
    }
  }
}
</script>
