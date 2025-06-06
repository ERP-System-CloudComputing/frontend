<template>
  <div class="mb-6">
    <div class="mb-4">
      <nuxt-link to="/logistics" class="text-blue-500 font-semibold text-sm">
        <v-icon left color="#1976d2">
          mdi-chevron-left
        </v-icon>
        Back
      </nuxt-link>
    </div>

    <v-card flat rounded="lg">
      <v-card-title>Logistics Request</v-card-title>
      <v-card-subtitle>Kindly fill in the form below to submit a logistics request.</v-card-subtitle>
      <v-spacer />
      <v-card-text>
        <v-form ref="formLogistics" v-model="isFormLogisticsValid">
          <v-row dense>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Request title</label>
              <v-text-field v-model="logisticsRequest.title" placeholder="Enter title" outlined dense :rules="[rules.required]"/>
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Purpose</label>
              <v-text-field v-model="logisticsRequest.purpose" placeholder="Enter purpose" outlined dense :rules="[rules.required]"/>
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Amount</label>
              <v-text-field
                v-model="logisticsRequest.amount"
                placeholder="Enter amount in $"
                outlined
                dense
                prefix="$"
                :rules="[rules.required, rules.positiveAmount]"
                @blur="formatAmount"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Requested by</label>
              <v-text-field v-model="logisticsRequest.requestedBy" placeholder="Enter requested by" outlined dense :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Sent to</label>
              <v-select
                v-model="logisticsRequest.sentTo"
                :items="users"
                placeholder="Select office"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Date from</label>
              <v-text-field
                v-model="logisticsRequest.dateFrom"
                placeholder="DD/MM/YYYY"
                outlined
                dense
                type="date"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Date to</label>
              <v-text-field
                v-model="logisticsRequest.dateTo"
                placeholder="DD/MM/YYYY"
                outlined
                dense
                type="date"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>

          <v-btn
            color="primary"
            class="w-full max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
            @click="saveLogistics"
          >
            Attach Payment Voucher
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card flat rounded="lg">
      <v-card-title>Logistics Request</v-card-title>
      <v-spacer />
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="logisticsRequests"
          class="rounded-lg overflow-hidden"
          hide-default-footer
          item-value="id"
        >
          <template #[`item.amount`]="{ item }">
            {{ formatCurrency(item.amount) }}
          </template>
          <template #[`item.dateFrom`]="{ item }">
            {{ new Date(item.dateFrom).toLocaleDateString('en-US') }}
          </template>
          <template #[`item.dateTo`]="{ item }">
            {{ new Date(item.dateTo).toLocaleDateString('en-US') }}
          </template>
          <template #[`item.attachment`]="{ item, index }">
            <input
              type="file"
              :id="`file-input-${index}`"
              accept=".pdf"
              style="display: none"
              @change="e => handleFileUpload(e, item)"
            />
            <button
              @click="triggerRowFileInput(index)"
            >
              <v-icon left color="#1976d2">
                mdi-paperclip
              </v-icon>
              {{ item.attachment.fileName || 'No attachment' }}
            </button>
          </template>
        </v-data-table>
      </v-card-text>

      <v-spacer />

      <v-card-title>Beneficiary Payment Details</v-card-title>
      <v-spacer />
      <v-card-text>
        <v-form ref="formBeneficiary" v-model="isFormBeneficiaryValid">
          <v-row>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Account name</label>
              <v-text-field
                v-model="beneficiaryPaymentDetails.accountName"
                placeholder="Enter name"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Account number</label>
              <v-text-field
                v-model="beneficiaryPaymentDetails.accountNumber"
                placeholder="Enter number"
                outlined
                dense
                :rules="[rules.clabe]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Bank name</label>
              <v-text-field
                v-model="beneficiaryPaymentDetails.bankName"
                placeholder="Enter bank name"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
        </v-form>

        <v-row>
          <v-col cols="12" md="4">
            <vue-signature-pad
              ref="verifierPad"
              :options="signatureOptions"
              style="border: 1px solid #ccc; height: 100px; border-bottom: 1px solid black; margin-bottom: 1rem;"
            />
            <label class="text-sm font-normal text-black">Verifier Signature</label>
          </v-col>
          <v-col cols="12" md="4">
            <vue-signature-pad
              ref="authorizerPad"
              :options="signatureOptions"
              style="border: 1px solid #ccc; height: 100px; border-bottom: 1px solid black; margin-bottom: 1rem;"
            />
            <label class="text-sm font-normal text-black">Authorizer Signature</label>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="flex gap-5 flex-col md:flex-row">
        <v-btn
          color="primary"
          class="w-full max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
          :disabled="logisticsRequests.length === 0"
          @click="handleSubmit"
        >
          Save and Send for Approval
        </v-btn>
        <!-- Boton con el texto azul, bg blanco y borde azul y redondeado -->
        <button
          class="h-9 p-px bg-gradient-to-r from-primario to-secundario rounded-lg hover:opacity-90 duration-500 transform hover:scale-110 ease-in-out hover:shadow-lg"
          :disabled="logisticsRequests.length === 0"
        >
          <div class="bg-white rounded-lg h-full w-full flex items-center justify-center text-blue-500 px-9 py-3">
            Save
          </div>
        </button>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { VueSignaturePad } from 'vue-signature-pad'

export default {
  layout: 'principal',
  components: {
    VueSignaturePad
  },
  data () {
    return {
      rules: {
        required: value => !!value || 'El campo es obligatorio',
        positiveAmount: value => (value && parseFloat(value) > 0) || 'El monto debe ser positivo',
        clabe: (value) => {
          if (!value) {
            return 'La CLABE es obligatoria.'
          }
          if (!/^\d+$/.test(value)) {
            return 'La CLABE debe contener solo números.'
          }
          if (value.length !== 18) {
            return 'La CLABE debe tener 18 dígitos.'
          }
          return true
        }
      },
      logisticsRequest: {
        title: '',
        purpose: '',
        amount: 0,
        requestedBy: '',
        sentTo: '',
        dateFrom: null,
        dateTo: null,
        attachment: ''
      },
      beneficiaryPaymentDetails: {
        accountName: '',
        accountNumber: '',
        bankName: '',
        verifierSignatureData: '',
        authorizerSignatureData: ''
      },
      isFormLogisticsValid: false,
      isFormBeneficiaryValid: false,
      users: [
        'John Doe',
        'Jane Smith',
        'Alice Johnson',
        'Bob Brown'
      ],
      headers: [
        { text: 'S/N', value: 'sn', sortable: false, width: '5%' },
        { text: 'Request Title', value: 'title' },
        { text: 'Purpose', value: 'purpose' },
        { text: 'Date From', value: 'dateFrom' },
        { text: 'Date To', value: 'dateTo' },
        { text: 'Amount ($)', value: 'amount' },
        { text: 'Attachment', value: 'attachment' }
      ],
      logisticsRequests: [],
      signatureOptions: {
        minWidth: 1,
        maxWidth: 2.5,
        penColor: 'black'
      }
    }
  },
  methods: {
    formatCurrency (amount) {
      return amount.toLocaleString('en-NG', { style: 'currency', currency: 'MXN' })
    },
    saveLogistics () {
      if (this.$refs.formLogistics.validate()) {
        this.logisticsRequests.push({
          ...this.logisticsRequest,
          sn: this.logisticsRequests.length + 1
        })
        this.resetForm()
      } else {
        console.log('Formulario no válido')
      }

      console.log(this.logisticsRequests)
    },
    resetForm () {
      this.logisticsRequest = {
        title: '',
        purpose: '',
        amount: 0,
        requestedBy: '',
        sentTo: '',
        dateFrom: null,
        dateTo: null,
        attachment: ''
      }
      this.$refs.formLogistics.reset()
    },
    formatAmount () {
      const value = this.logisticsRequest.amount.toString().replace(/,/g, '') // quitar comas si las hay
      const number = parseFloat(value)

      if (!isNaN(number)) {
        // Si hay mas de 3 dígitos, formatea con comas
        this.logisticsRequest.amount = number.toLocaleString('en-US', {
          style: 'currency',
          currency: 'MXN',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).replace('MX$', '') // Elimina el símbolo de moneda para que no se envíe al servidor
      } else {
        this.logisticsRequest.amount = ''
      }
    },
    triggerRowFileInput (itemId) {
      const fileInput = document.getElementById(`file-input-${itemId}`)
      if (fileInput) {
        fileInput.value = null // Importante para permitir seleccionar el mismo archivo otra vez
        fileInput.click()
      } else {
        console.error(`No se encontró el input de archivo para el item con ID: ${itemId}`)
        Swal.fire('Error', 'No se encontró el control de subida para este item.', 'error')
      }
    },
    async handleFileUpload (event, item) {
      const file = event.target.files[0]
      if (file) {
        if (file.type !== 'application/pdf') {
          console.warn('Solo se permiten archivos PDF')
          return
        }

        if (file.size > 5 * 1024 * 1024) { // 5 MB
          console.warn('El archivo es demasiado grande. El tamaño máximo permitido es de 5 MB.')
          return
        }

        // Aquí puedes manejar la subida del archivo, por ejemplo, enviarlo a un servidor
        const formData = new FormData()
        formData.append('file', file)

        try {
          const response = await this.$axios.post('/files/upload-pdf', formData)

          if (response.status === 200) {
            item.attachment = response.data
            Swal.fire('Éxito', 'Archivo subido correctamente.', 'success')
          } else {
            console.warn('Error al subir el archivo:', response.data)
            Swal.fire('Error', 'No se pudo subir el archivo. Por favor, inténtelo de nuevo más tarde.', 'error')
          }
        } catch (error) {
          console.error('Error al subir el archivo:', error)
          Swal.fire('Error', 'No se pudo subir el archivo. Por favor, inténtelo de nuevo más tarde.', 'error')
        }
      } else {
        console.warn('No se seleccionó ningún archivo')
      }
    },
    async handleSubmit () {
      const verifierSignatureData = this.$refs.verifierPad.saveSignature()
      const authorizerSignatureData = this.$refs.authorizerPad.saveSignature()

      if (this.$refs.formBeneficiary.validate()) {
        if (verifierSignatureData.isEmpty || authorizerSignatureData.isEmpty) {
          Swal.fire({
            title: 'Error',
            text: 'Por favor, firme los campos de verificador y autorizador.',
            icon: 'error'
          })
          return
        }
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un servidor
        this.beneficiaryPaymentDetails.verifierSignatureData = verifierSignatureData.data
        this.beneficiaryPaymentDetails.authorizerSignatureData = authorizerSignatureData.data
        this.beneficiaryPaymentDetails.accountNumber = parseFloat(this.beneficiaryPaymentDetails.accountNumber.replace(/,/g, '')) // Elimina comas si las hay

        try {
          const responseBeneficiary = await this.$axios.post('/beneficiary/create', this.beneficiaryPaymentDetails)

          if (responseBeneficiary.status === 201) {
            // Mostrar mensaje de exito e indicarle al usuario que espere para cargar todos los logistics
            Swal.fire({
              title: 'Éxito',
              text: 'Detalles de pago del beneficiario guardados correctamente.',
              icon: 'success'
            })

            // Mostrar mensaje de carga
            Swal.fire({
              title: 'Cargando',
              text: 'Por favor, espere mientras se cargan los detalles de logística.',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading()
              }
            })

            const logisticsFailed = []

            await this.logisticsRequests.forEach(async (request) => {
              const response = await this.$axios.post('/logistics/create', { ...request })

              if (response.status !== 201) {
                logisticsFailed.push(request)
              }
            })

            if (logisticsFailed.length > 0) {
              Swal.close()
              Swal.fire({
                title: 'Algunos detalles de logística no se pudieron guardar',
                text: 'Por favor, inténtelo de nuevo más tarde.',
                icon: 'warning'
              })
            } else {
              Swal.close() // Cierra el mensaje de carga
              // Mostrar mensaje de éxito y redirigir a la página de logística
              Swal.fire({
                title: 'Éxito',
                text: 'Detalles de logística guardados correctamente.',
                icon: 'success'
              }).then(() => {
                this.$router.push('/logistics')
              })
            }
          } else {
            Swal.fire({
              title: 'Error',
              text: 'No se pudieron guardar los detalles de pago del beneficiario. Por favor, inténtelo de nuevo más tarde.',
              icon: 'error'
            })
          }
        } catch (error) {
          console.error('Error al enviar la solicitud:', error)
          Swal.fire({
            title: 'Error',
            text: 'No se pudo enviar la solicitud. Por favor, inténtelo de nuevo más tarde.',
            icon: 'error'
          })
        }
      }
    }
  }
}
</script>
