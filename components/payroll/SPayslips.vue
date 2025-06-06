<template>
  <v-card>
    <v-card-title>
      Employee Payslip History
      <v-spacer />
      <input
        type="button"
        value="Create payslip"
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
  </v-card>
</template>

<script>
export default {
  name: 'PaySlips',
  data () {
    return {
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
  methods: {
    navegateToCreate () {
      // this.$router.push({ name: 'PayrollCreate' })
      this.$router.push({ path: '/payroll/create-payslip' })
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
    }
  }
}
</script>
