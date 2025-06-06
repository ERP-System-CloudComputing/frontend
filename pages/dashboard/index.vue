<template>
  <div class="">
    <dashboard-cards-vue />

    <div class="my-5 mb-2">
      <v-row>
        <v-col cols="12" md="6">
          <DashboardTable :data="memoData" />
        </v-col>
        <v-col cols="12" md="6">
          <DashboardTable :data="staffData" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <DashboardTable :data="memoData" />
        </v-col>
        <v-col cols="12" md="6">
          <DashboardDoughnutVue />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import DashboardCardsVue from '~/components/dashboard/DashboardCards.vue'
import DashboardDoughnutVue from '~/components/dashboard/DashboardDoughnut.vue'
import DashboardTable from '~/components/dashboard/DashboardTable.vue'

export default {
  components: {
    DashboardCardsVue,
    DashboardTable,
    DashboardDoughnutVue
  },
  layout: 'principal',
  middleware: 'auth',
  data () {
    return {
      memoData: {},
      staffData: {}
    }
  },
  mounted () {
    this.getMemoData()
    this.getStaffListData()
  },
  methods: {
    async getStaffListData () {
      try {
        const response = await this.$axios.get('/staff/getAll')
        console.log(response.data)

        this.staffData = {
          title: 'Staff List',
          headers: [
            { text: 'S/N', value: 'sn' },
            { text: 'Staff Name', value: 'name' },
            { text: 'Staff Role', value: 'role' },
            { text: 'Designation', value: 'designation' }
          ],
          items: response.data.map((staff, index) => ({
            sn: (index + 1).toString().padStart(2, '0'),
            name: `${staff.firstName} ${staff.lastName}`,
            role: staff.role,
            designation: staff.designation
          }))
        }
      } catch (error) {
        console.error('Error fetching staff data:', error)
      }
    },
    async getMemoData () {
      try {
        const response = await this.$axios.get('/memo/getAll')

        this.memoData = {
          title: 'Memo',
          headers: [
            { text: 'S/N', value: 'sn' },
            { text: 'Memo Title', value: 'title' },
            { text: 'Sent From', value: 'sentFrom' },
            { text: 'Sent To', value: 'sentTo' },
            { text: 'Status', value: 'status' }
          ],
          items: response.data.map((memo, index) => ({
            sn: (index + 1).toString().padStart(2, '0'),
            title: memo.title,
            sentFrom: memo.sentFrom,
            sentTo: memo.sentTo,
            status: memo.action
          }))
        }
      } catch (error) {
        console.error('Error fetching memo data:', error)
      }
    }
  }
}
</script>
