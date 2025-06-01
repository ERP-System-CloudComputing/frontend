<template>
  <div class="my-5">
    <BudgetCardsVue v-if="anualBudget.actualAmount" :anualBudget="anualBudget" />

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
            <td>{{ formatCurrency(item.amount) }}</td>
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
        { text: 'Budget No.', value: 'number' },
        { text: 'Budget Description', value: 'description' },
        { text: 'Budgeted Amount (MXN)', value: 'amount' },
        { text: 'Actual Amount (MXN)', value: 'actualAmount' },
        { text: 'Variance (MXN)', value: 'variance' },
        { text: 'Date', value: 'date' }
      ],
      budgets: []
    }
  },
  async mounted () {
    try {
      await this.getAnualBudget()

      // Solo obtener presupuestos aprobados si el presupuesto anual se cargó correctamente
      if (this.anualBudget && this.anualBudget.id) {
        await this.getBudgetsApproved()
      }
    } catch (error) {
      console.error('Error en el hook mounted:', error)
    }
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
          const dataAnualBudget = response.data

          this.anualBudget = dataAnualBudget
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Error al obtener presupuesto anual',
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
    },
    async getBudgetsApproved () {
      try {
        const response = await this.$axios.get('/budget/getAllApproved')
        if (response.status === 200) {
          this.budgets = response.data.map((item, index) => ({
            ...item,
            sn: index + 1,
            date: new Date(item.requestDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }),
            variance: parseFloat(item.actualAmount) - parseFloat(item.amount.replace(/,/g, ''))
          }))

          const totalAmount = this.budgets.reduce(
            (sum, budget) => sum + parseFloat(budget.amount.replace(/,/g, '')),
            0
          )

          // Solo modificas campos derivados, sin reemplazar el objeto completo
          this.anualBudget.actualAmount = totalAmount
          this.anualBudget.totalBudgetBalance = this.anualBudget.totalAmount - totalAmount
          this.anualBudget.budgetUsedPercentage = ((totalAmount / this.anualBudget.totalAmount) * 100).toFixed(2) + '%'
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudieron cargar los presupuestos aprobados. Por favor, inténtelo de nuevo más tarde.',
            icon: 'error'
          })
        }
      } catch (error) {
        console.error('Error al obtener presupuestos aprobados:', error)
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al cargar los presupuestos aprobados. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error'
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
