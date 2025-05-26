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
  data () {
    return {
      memoData: {},
      staffData: {}
    }
  },
  mounted () {
    this.memoData = this.getMemoData()
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
    getMemoData () {
      return {
        title: 'Memo',
        headers: [
          { text: 'S/N', value: 'sn' },
          { text: 'Memo Title', value: 'title' },
          { text: 'Sent From', value: 'from' },
          { text: 'Sent To', value: 'to' },
          { text: 'Status', value: 'status' }
        ],
        items: [
          { sn: '01', title: 'Operations memo', from: 'Otor John', to: 'Ibrahim Sadiq', status: 'Pending' },
          { sn: '02', title: 'Project update', from: 'Fatima Faruk', to: 'James Emeka', status: 'Approved' },
          { sn: '03', title: 'Team restructuring', from: 'Ifeanyi Obinna', to: 'Chidinma Ebere', status: 'Approved' },
          { sn: '04', title: 'Budget request', from: 'Ibrahim Musa', to: 'Shola Abiola', status: 'Pending' },
          { sn: '05', title: 'System access request', from: 'Otor John', to: 'Bankole Olanrewaju', status: 'Rejected' },
          { sn: '06', title: 'New hire onboarding', from: 'Fatima Faruk', to: 'Ifeanyi Obinna', status: 'Approved' },
          { sn: '07', title: 'Security notice', from: 'James Emeka', to: 'Chidinma Ebere', status: 'Approved' },
          { sn: '08', title: 'Hardware request', from: 'Bankole Olanrewaju', to: 'Ibrahim Musa', status: 'Pending' },
          { sn: '09', title: 'Training memo', from: 'Shola Abiola', to: 'Fatima Faruk', status: 'Approved' },
          { sn: '10', title: 'Project timeline update', from: 'Chidinma Ebere', to: 'Otor John', status: 'Pending' }
        ]
      }
    }
  }
}
</script>
