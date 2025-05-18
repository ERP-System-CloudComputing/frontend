<template>
  <div>
    <BudgetCardsVue />

    <div>
      <h3>Create a Budget</h3>

      <v-spacer />

      <v-button></v-button>
    </div>
  </div>
</template>

<script>
import BudgetCardsVue from '~/components/budget/BudgetCards.vue'

export default {
  components: {
    BudgetCardsVue
  },
  layout: 'principal'
}
</script>
