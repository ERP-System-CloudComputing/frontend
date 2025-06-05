<template>
  <div>
    <div class="mb-4">
      <nuxt-link to="/logistics" class="text-blue-500 font-semibold text-sm">
        <v-icon left color="#1976d2">
          mdi-chevron-left
        </v-icon>
        Back
      </nuxt-link>
    </div>

    <v-card flat rounded="lg">
      <v-card-title class="text-2xl font-extrabold">
        {{ logistics.title }}
      </v-card-title>
      <v-spacer />
      <v-card-text>
        <div class="space-y-4 mb-8">
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">Purpose:</span>
            <span class="text-gray-700">{{ logistics.purpose }}</span>
          </div>
          <div v-if="logistics.amount" class="flex text-gray-800">
            <span class="font-extrabold pr-2">Amount:</span>
            <span class="text-gray-700">MX${{ formatCurrency(logistics.amount) }}</span>
          </div>
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">From:</span>
            <span class="text-gray-700">{{ logistics.requestedBy }}</span>
          </div>
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">To:</span>
            <span class="text-gray-700">{{ logistics.sentTo }}</span>
          </div>
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">Duration:</span>
            <span class="text-gray-700">{{ calculateDuration(logistics.dateFrom, logistics.dateTo) }}</span>
          </div>
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">Status:</span>
            <span :class="logistics.status === 'Approved' ? 'text-green-600' : 'text-yellow-500'">
              {{ logistics.status }}
            </span>
          </div>
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">Attachments:</span>
            <span class="text-gray-700">{{ logistics.attachment ? 'Yes' : 'No'}}</span>
          </div>
        </div>

        <div v-if="logistics.attachment" class="mt-6">
          <iframe
            :src="`${api_url}${logistics.attachment.filePath}`"
            type="application/pdf"
            width="100%"
            height="700px"
            class="rounded border"
          ></iframe>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import Swal from 'sweetalert2'

export default {
  layout: 'principal',
  data () {
    return {
      api_url: process.env.APP_URL || 'http://localhost:5000/api',
      idLogistics: null,
      logistics: {}
    }
  },
  async mounted () {
    this.idLogistics = this.$route.params.id
    await this.getLogistics()
  },
  methods: {
    formatCurrency (amount) {
      return amount.toLocaleString('en-NG', { style: 'currency', currency: 'MXN' })
    },
    calculateDuration (startDate, endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) // Convert milliseconds to days
      return `${duration} day(s) - (${start.toLocaleDateString()} - ${end.toLocaleDateString()})`
    },
    async getLogistics () {
      try {
        const { data } = await this.$axios.get(`/logistics/${this.idLogistics}`)
        if (data) {
          this.logistics = data
        } else {
          this.$router.push('/logistics')
        }
      } catch (error) {
        this.$router.push('/logistics')
      }
    }
  }
}
</script>
