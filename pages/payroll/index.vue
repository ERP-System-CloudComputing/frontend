<template>
  <div>
    <PayrollCards />
    <PayrollTable />
  </div>
</template>

<script>
import PayrollTable from '~/components/payroll/payrollTable.vue'
import PayrollCards from '~/components/payroll/payrollCards.vue'
export default {
  name: 'PayrollIndex',
  components: {
    PayrollCards,
    PayrollTable
  },
  layout: 'principal'
}
</script>

<style scoped>
.payroll-container {
  padding: 20px;
  height: 100%;
}
</style>
