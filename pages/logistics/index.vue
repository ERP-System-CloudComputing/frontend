<template>
  <div class="my-5">
    <LogisticsCardsVue />

    <div class="flex justify-between items-center flex-col sm:flex-row mt-6 bg-white py-9 px-5 rounded-2xl shadow-sm">
      <h3 class="text-xl font-semibold">
        Logistics request
      </h3>

      <nuxt-link
        to="/logistics/create"
        class="px-16 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
      >
        Make Logistics Request
      </nuxt-link>
    </div>

    <v-card class="rounded-2xl shadow-sm mt-6" elevation="0">
      <v-card-title>All Logistics Request</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="logisticsRequests"
          class="elevation-1 rounded-lg overflow-hidden"
          hide-default-footer
          item-value="id"
        >
          <template #[`item.amount`]="{ item }">
            {{ formatCurrency(item.amount) }}
          </template>
          <template #[`item.status`]="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark small>
              {{ item.status }}
            </v-chip>
          </template>
          <template #[`item.action`]="{ item }">
            <nuxt-link
              :to="`/logistics/request/${item.id}`"
              class="text-primario hover:underline font-medium"
            >
              View more
            </nuxt-link>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import LogisticsCardsVue from '~/components/logistics/LogisticsCards.vue'

export default {
  components: {
    LogisticsCardsVue
  },
  layout: 'principal',
  data () {
    return {
      headers: [
        { text: 'S/N', value: 'sn', sortable: false, width: '5%' },
        { text: 'Title', value: 'title', sortable: true },
        { text: 'Purpose', value: 'purpose', sortable: true },
        { text: 'Amount', value: 'amount', sortable: true, align: 'end' }, // Alineado a la derecha para montos
        { text: 'Requested By', value: 'requestedBy', sortable: true },
        { text: 'Sent to', value: 'sentTo', sortable: true },
        { text: 'Date', value: 'dateFrom', sortable: true },
        { text: 'Status', value: 'status', sortable: true, align: 'center' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      logisticsRequests: []
    }
  },
  methods: {
    formatCurrency (amount) {
      return amount.toLocaleString('en-NG', { style: 'currency', currency: 'MXN' })
    },
    getStatusColor (status) {
      if (status === 'APPROVED') {
        return 'green darken-1'
      } else if (status === 'PENDING') {
        return 'orange darken-1'
      } else if (status === 'REJECTED') {
        return 'red darken-1'
      } else {
        return 'grey'
      }
    },
    viewDetails (item) {
      // Lógica para ver detalles, por ejemplo, navegar a otra página o abrir un modal
      this.$router.push(`/logistics/request/${item.id}`)
    },
    async fetchLogisticsRequests () {
      try {
        const response = await this.$axios.get('/logistics/getAll')
        this.logisticsRequests = response.data.map((item, index) => ({
          ...item,
          sn: index + 1, // Agrega el número de serie
          dateFrom: new Date(item.dateFrom).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        }))
      } catch (error) {
        console.error('Error fetching logistics requests:', error)
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch logistics requests.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  },
  mounted () {
    this.fetchLogisticsRequests()
  }
}
</script>

<style scoped>
.color-white {
  color: white !important;
}
</style>
