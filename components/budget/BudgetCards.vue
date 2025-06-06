<template>
  <v-row dense>
    <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="3">
      <div class="bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between h-36">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-2xl font-extrabold">
              {{ card.value }}
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              {{ card.label }}
            </p>
          </div>
          <div class="p-2 flex items-center justify-center rounded-full icono" :class="card.iconBg">
            <v-icon :color="card.iconColor" size="30">
              mdi-piggy-bank
            </v-icon>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    anualBudget: {
      type: Object
    }
  },
  data () {
    return {
      cards: [
        {
          value: this.formatCurrency(this.anualBudget.totalAmount || 0),
          label: 'Total annual budget',
          iconBg: 'bg-blue-100',
          iconColor: 'blue'
        },
        {
          value: this.formatCurrency(this.anualBudget.actualAmount || 0),
          label: 'Amount used, YTD',
          iconBg: 'bg-yellow-100',
          iconColor: 'orange'
        },
        {
          value: this.formatCurrency(this.anualBudget.totalBudgetBalance || 0),
          label: 'Total budget balance',
          iconBg: 'bg-purple-100',
          iconColor: 'purple'
        },
        {
          value: `${this.anualBudget.budgetUsedPercentage || 0}%`,
          label: 'Budget % used',
          iconBg: 'bg-green-100',
          iconColor: 'green'
        }
      ]
    }
  },
  methods: {
    formatCurrency (value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value).replace('MX', '')
    }
  }
}
</script>

<style scoped>
.icono {
  flex: none !important;
}
</style>
