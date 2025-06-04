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
        <v-form ref="form" v-model="isFormValid">
          <v-row dense>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Request title</label>
              <v-text-field placeholder="Enter title" outlined dense :rules="[rules.required]"/>
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Purpose</label>
              <v-text-field placeholder="Enter purpose" outlined dense :rules="[rules.required]"/>
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Amount</label>
              <v-text-field
                placeholder="Enter amount in $"
                outlined
                dense
                prefix="$"
                :rules="[rules.required, rules.positiveAmount]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Requested by</label>
              <v-text-field placeholder="Enter requested by" outlined dense :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Sent to</label>
              <v-select
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
          <template #[`item.attachment`]="{ item }">
            <button>
              <v-icon left color="#1976d2">
                mdi-paperclip
              </v-icon>
              {{ item.attachment || 'No attachment' }}
            </button>
          </template>
        </v-data-table>
      </v-card-text>

      <v-spacer />

      <v-card-title>Beneficiary Payment Details</v-card-title>
      <v-spacer />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <label class="text-sm font-normal text-black">Account name</label>
            <v-text-field placeholder="Enter name" outlined dense :rules="[rules.required]" />
          </v-col>
          <v-col cols="12" md="4">
            <label class="text-sm font-normal text-black">Account number</label>
            <v-text-field placeholder="Enter number" outlined dense :rules="[rules.required]" />
          </v-col>
          <v-col cols="12" md="4">
            <label class="text-sm font-normal text-black">Bank name</label>
            <v-text-field placeholder="Enter bank name" outlined dense :rules="[rules.required]" />
          </v-col>
        </v-row>

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
              ref="verifierPad"
              :options="signatureOptions"
              style="border: 1px solid #ccc; height: 100px; border-bottom: 1px solid black; margin-bottom: 1rem;"
            />
            <label class="text-sm font-normal text-black">Authorizer Signature</label>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="primary"
          class="w-full max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
        >
          Save and Send for Approval
        </v-btn>
        <!-- Boton con el texto azul, bg blanco y borde azul y redondeado -->
        <v-btn
          color="secondary"
          class="w-full max-w-xs px-8 py-3 bg-white text-blue-500 border border-blue-500 rounded-lg
                hover:bg-blue-500 hover:text-white duration-500 transform hover:scale-105 ease-in-out"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// import Swal from 'sweetalert2'
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
        positiveAmount: value => (value > 0) || 'El monto debe ser positivo'
      },
      isFormValid: false,
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
    }
  }
}
</script>
