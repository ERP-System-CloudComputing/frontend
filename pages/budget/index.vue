<template>
  <div class="my-5">
    <BudgetCardsVue />

    <div class="flex justify-between items-center flex-col sm:flex-row mt-6 bg-white py-9 px-5 rounded-2xl shadow-sm">
      <h3 class="text-xl font-semibold">
        Create a Budget
      </h3>

      <nuxt-link
        :to="`/budget/create/${anualBudget.id}`"
        class="px-16 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
              hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
      >
        Create Budget
      </nuxt-link>
    </div>

    <v-card class="rounded-2xl shadow-sm mt-6" elevation="0">
      <v-card-title>Budget History</v-card-title>
      <v-data-table
        :headers="headers"
        :items="budgets"
        class="elevation-1 rounded-lg overflow-hidden"
        hide-default-footer
        item-value="id"
      >
        <template #item="{ item }">
          <tr>
            <td>{{ item.sn }}</td>
            <td>{{ item.budgetNo }}</td>
            <td>{{ item.description }}</td>
            <td>{{ formatCurrency(item.budgetedAmount) }}</td>
            <td>{{ formatCurrency(item.actualAmount) }}</td>
            <td :class="item.variance >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ item.variance >= 0 ? '+' : '' }}{{ formatCurrency(item.variance) }}
            </td>
            <td>{{ item.date }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import BudgetCardsVue from '~/components/budget/BudgetCards.vue'

export default {
  components: {
    BudgetCardsVue
  },
  layout: 'principal',
  data () {
    return {
      anualBudget: {},
      headers: [
        { text: 'S/N', value: 'sn', width: 70 },
        { text: 'Budget No.', value: 'budgetNo' },
        { text: 'Budget Description', value: 'description' },
        { text: 'Budgeted Amount (MXN)', value: 'budgetedAmount' },
        { text: 'Actual Amount (MXN)', value: 'actualAmount' },
        { text: 'Variance (MXN)', value: 'variance' },
        { text: 'Date', value: 'date' }
      ],
      budgets: [
        { sn: '01', budgetNo: '03211235', description: 'Purchase of 10 units, 2Hp Hisense Air Conditions', budgetedAmount: 1400000, actualAmount: 1380000, variance: 20000, date: '18/11/2022' },
        { sn: '02', budgetNo: '36211235', description: 'Purchase of office equipments', budgetedAmount: 4000000, actualAmount: 4000000, variance: 0, date: '20/09/2022' },
        { sn: '03', budgetNo: '06211235', description: 'Purchase of 10 units, 2Hp Hisense Air Conditions', budgetedAmount: 2000000, actualAmount: 1800000, variance: 200000, date: '01/09/2022' },
        { sn: '04', budgetNo: '04214685', description: 'Purchase of 10 units, 2Hp Hisense Air Conditions', budgetedAmount: 1400000, actualAmount: 1380000, variance: 20000, date: '11/06/2022' },
        { sn: '05', budgetNo: '36211235', description: 'Purchase of office equipments', budgetedAmount: 400000, actualAmount: 500000, variance: -100000, date: '20/09/2022' },
        { sn: '06', budgetNo: '06211235', description: 'Purchase of 10 units, 2Hp Hisense Air Conditions', budgetedAmount: 1400000, actualAmount: 1380000, variance: 20000, date: '18/11/2022' },
        { sn: '07', budgetNo: '03211235', description: 'Purchase of 10 units, 2Hp Hisense Air Conditions', budgetedAmount: 1400000, actualAmount: 1380000, variance: 20000, date: '18/11/2022' }
      ]
    }
  },
  mounted () {
    this.getAnualBudget()
  },
  methods: {
    formatCurrency (amount) {
      return amount.toLocaleString('en-NG', { style: 'currency', currency: 'MXN' })
    },
    async getAnualBudget () {
      try {
        const year = new Date().getFullYear()
        const response = await this.$axios.get(`/anualBudget/year/${year}`)

        if (response.status === 200 && response.data) {
          this.anualBudget = response.data
        } else {
          Swal.fire({
            icon: 'info',
            title: 'No Annual Budget Found',
            text: `No se encontró un presupuesto anual para el año ${year}. Por favor, cree uno primero.`
          })
        }
      } catch (error) {
        console.error('Error fetching annual budget:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al obtener el presupuesto anual. Por favor, inténtelo de nuevo más tarde.'
        })
      }
    }
  }
}
</script>

<style scoped>
.color-white {
  color: white !important;
}
</style>
