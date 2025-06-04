<template>
  <div>
    <PayrollCards />
    <!-- <PayrollTable /> -->
  </div>
</template>

<script>
// import PayrollTable from '~/components/payroll/SSalaryBreakdown.vue'
import PayrollCards from '~/components/payroll/payrollIndex.vue'
export default {
  name: 'PayrollIndex',
  components: {
    PayrollCards
    // PayrollTable
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
