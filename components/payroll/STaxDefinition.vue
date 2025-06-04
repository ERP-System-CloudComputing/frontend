<template>
  <v-card>
    <v-card-title>
      Tax Definition
      <v-spacer />
      <input
        type="button"
        value="Create Tax Definition"
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
  name: 'TaxDefinition',
  data () {
    return {
      search: '',
      headers: [
        { text: 'S/N', value: 'index', width: '60px' },
        { text: 'Tax Type', value: 'taxType', width: '120px' },
        { text: '% value', value: 'porcentage', width: '120px' },
        { text: 'Actions', value: 'actions', sortable: false, width: '160px' }
      ],
      tableData: [
        {
          taxType: 'NHIS',
          porcentage: '2%'
        },
        {
          taxType: 'VAT',
          porcentage: '2.5%'
        },
        {
          taxType: 'WHT',
          porcentage: '5%'
        },
        {
          taxType: 'NHIS',
          porcentage: '2%'
        },
        {
          taxType: 'VAT',
          porcentage: '2.5%'
        },
        {
          taxType: 'WHT',
          porcentage: '5%'
        }
      ]
    }
  },
  computed: {
    computedTableData () {
      return this.tableData.map((item, index) => ({
        ...item,
        index: index + 1,
        porcentageValue: item.porcentage + item.allowance
      }))
    }
  },
  methods: {
    navegateToCreate () {
      // this.$router.push({ name: 'PayrollCreate' })
      this.$router.push({ path: '/payroll/create-TaxDefinition' })
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
