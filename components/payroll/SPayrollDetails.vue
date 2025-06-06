<template>
  <v-card>
    <v-card-title>
      Employee Salary History
      <v-spacer />
      <input
        type="button"
        value="Create Payroll"
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
      <template #[`item.payment`]="{ item }">
        {{ formatCurrency(item.payment) }}
      </template>
      <template #[`item.designition`]="{ item }">
        {{ formatCurrency(item.designition) }}
      </template>
      <template #[`item.date`]="{ item }">
        {{ formatCurrency(item.date) }}
      </template>
      <template #[`item.month`]="{ item }">
        {{ formatCurrency(item.month) }}
      </template>
      <template #[`item.status`]="{ item }">
        <div class="flex items-center">
          <v-icon
            small
            :color="item.status === 'Paid' ? 'green' : 'orange'"
            class="mr-1"
          >
            {{ item.status === 'Paid' ? 'mdi-check-circle' : 'mdi-clock-alert' }}
          </v-icon>
          <span :class="item.status === 'Paid' ? 'green--text text--darken-2' : 'orange--text text--darken-2'">
            {{ item.status }}
          </span>
        </div>
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
  name: 'PayrollDetails',
  data () {
    return {
      search: '',
      headers: [
        { text: 'S/N', value: 'index', width: '60px' },
        { text: 'Payment Name', value: 'payment', width: '120px' },
        { text: 'Designition', value: 'designition', width: '120px' },
        { text: 'Date Generated', value: 'date', width: '100px' },
        { text: 'Payment Month', value: 'month', width: '120px' },
        { text: 'Payment Year', value: 'year', width: '120px' },
        { text: 'Status', value: 'status', width: '120px' },
        { text: 'Actions', value: 'actions', sortable: false, width: '160px' }
      ],
      tableData: [
        {
          payment: 'Monthly salary',
          designition: 'Operations Department',
          date: this.getCurrentDate(),
          month: 'Junary',
          year: 2023,
          status: 'Pending'
        },
        {
          payment: 'Monthly salary',
          designition: 'Accounts Department',
          date: this.getCurrentDate(),
          month: 'Junary',
          year: 2023,
          status: 'Pending'
        },
        {
          payment: 'Monthly salary',
          designition: 'Operations Department',
          date: this.getCurrentDate(),
          month: 'Junary',
          year: 2022,
          status: 'Paid'
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
      this.$router.push({ path: '/payroll/create-payroll' })
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
    getCurrentDate () {
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // * Meses son 0-11
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    }
  }
}
</script>
