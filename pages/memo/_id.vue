<template>
  <div>
    <div class="mb-4">
      <nuxt-link to="/memo" class="text-blue-500 font-semibold text-sm">
        <v-icon left color="#1976d2">
          mdi-chevron-left
        </v-icon>
        Back
      </nuxt-link>
    </div>

    <v-card flat rounded="lg">
      <v-card-title class="text-2xl font-extrabold">
        {{ memo.title }}
      </v-card-title>
      <v-spacer />
      <v-card-text>
        <div class="space-y-4 mb-8">
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">Date:</span>
            <span class="text-gray-700">{{ formatDate(memo.date) }}</span>
          </div>
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">From:</span>
            <span class="text-gray-700">{{ memo.sentFrom }}</span>
          </div>
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">To:</span>
            <span class="text-gray-700">{{ memo.sentTo }}</span>
          </div>
          <div class="flex text-gray-800">
            <span class="font-extrabold pr-2">Attachments:</span>
            <span class="text-gray-700">{{ memo.haveAttachment }}</span>
          </div>
          <div class="flex text-gray-800">
            <p class="font-extrabold pr-2">Memo Message:
              <span class="text-gray-700 font-normal">{{ memo.body }}</span>
            </p>
          </div>
        </div>

        <div v-if="memo.attachment" class="mt-6">
          <iframe
            :src="`${api_url}/files/pdf/${memo.attachment.fileName}`"
            type="application/pdf"
            width="100%"
            height="700px"
            class="rounded border"
          ></iframe>
        </div>

        <div class="mt-10">
          <v-form ref="formSubmit" v-model="isFormSubmit">
            <v-row class="items-center">
              <v-col cols="12" md="4">
                <label class="text-sm font-normal text-black">Action</label>
                <v-select
                  v-model="dataSubmit.action"
                  :items="actions"
                  placeholder="Select action"
                  outlined
                  dense
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="4">
                <label class="text-sm font-normal text-black">Remarks</label>
                <v-text-field
                  v-model="dataSubmit.remarks"
                  placeholder="Enter remarks"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-btn
                  color="primary"
                  class="w-full"
                  @click="submitAction"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  layout: 'principal',
  data () {
    return {
      api_url: process.env.APP_URL || 'http://localhost:5000/api',
      idMemo: null,
      memo: {},
      actions: [
        { text: 'Approve', value: 'APPROVED' },
        { text: 'Reject', value: 'REJECT' },
        { text: 'Pending', value: 'PENDING' }
      ],
      rules: {
        required: value => !!value || 'This field is required'
      },
      dataSubmit: {
        action: '',
        remarks: ''
      },
      isFormSubmit: false
    }
  },
  async mounted () {
    this.idMemo = this.$route.params.id
    await this.getMemo()
  },
  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    },
    async getMemo () {
      try {
        const { data } = await this.$axios.get(`/memo/${this.idMemo}`)
        if (data) {
          this.memo = data
          console.log(this.memo)
        } else {
          this.$router.push('/memo')
        }
      } catch (error) {
        this.$router.push('/memo')
      }
    },
    async submitAction () {
      if (this.$refs.formSubmit.validate()) {
        try {
          const response = await this.$axios.put(`/logistics/action/${this.idLogistics}`, this.dataSubmit)
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'Acción actualizada correctamente.'
            }).then(() => {
              this.$router.push('/logistics')
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ha ocurrido un error al enviar la acción.'
            })
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al enviar la acción.'
          })
        }
      }
    }
  }
}
</script>
