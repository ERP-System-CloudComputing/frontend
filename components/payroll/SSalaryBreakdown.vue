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
      <template #[`item.deductions`]="{ item }">
        {{ formatCurrency(item.deductions) }}
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

export default {
  name: 'PayrollTable',
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
        { text: 'Deductions', value: 'deductions', width: '120px' },
        { text: 'Net Salary', value: 'netSalary', width: '120px' },
        { text: 'Actions', value: 'actions', sortable: false, width: '160px' }
      ],
      tableData: [
        {
          title: 'Manager Director',
          level: 'MD/CEO',
          basicSalary: 5000,
          allowance: 1000,
          deductions: 500
        },
        {
          title: 'Executive Director',
          level: 'ED',
          basicSalary: 3000,
          allowance: 500,
          deductions: 300
        },
        {
          title: 'General Manager',
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
      this.$router.push({ path: '/payroll/create' })
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
