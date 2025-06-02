<template>
  <v-container fluid>
    <v-row class="bg-white rounded-lg">
      <v-col cols="12">
        <h1 class="font-bold text-lg">
          Payment Voucher
        </h1>
      </v-col>
      <v-col cols="12" md="3" class="sm:space-y-3">
        <span class="text-gray-600">
          Subject
        </span>
        <v-text-field
          class="rounded-lg"
          placeholder="Enter subject"
          dense
          outlined
        />
      </v-col>
      <v-col cols="12">
        <v-data-table
          class="w-full rounded-xl"
          :headers="headers"
          :items="vouchers"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          hide-default-footer
          dense
        >
          <template #footer>
            <v-row class=" border-b-2">
              <v-col cols="12" md="2">
                <div class="border border-gray-300 rounded-xl p-4 hover:bg-gray-100">
                  <button>
                    <v-icon>
                      mdi-plus
                    </v-icon>
                    <span class="sm:pl-5"> Add another row</span>
                  </button>
                </div>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" sm="3">
                    <h1 class="font-bold text-lg">
                      Total
                    </h1>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <span class="font-bold text-lg">
                      wait
                    </span>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <span class="font-bold text-lg">
                      wait
                    </span>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <span class="font-bold text-lg">
                      wait
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12">
        <span>
          Net amount in words:{{ '--' }}
        </span>
      </v-col>
      <v-col cols="12">
        <h1 class="font-bold text-lg">
          Beneficiary Payment Details
        </h1>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="12" sm="4">
            <span>
              Account name
            </span>
            <v-text-field
              class="rounded-lg"
              placeholder="Enter name"
              dense
              outlined
            />
          </v-col>
          <v-col cols="12" sm="4">
            <span>
              Account number
            </span>
            <v-text-field
              class="rounded-lg"
              placeholder="Enter number"
              dense
              outlined
            />
          </v-col>
          <v-col cols="12" sm="4">
            <span>
              Bank name
            </span>
            <v-text-field
              class="rounded-lg"
              placeholder="Enter bank name"
              dense
              outlined
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <div>
          <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4">
            Submit Payment Voucher
          </button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      headers: [
        { text: 'S/N', value: 'sn', sortable: false },
        { text: 'Class', value: 'class' },
        { text: 'Description', value: 'description' },
        { text: 'QTY', value: 'qty' },
        { text: 'Unit Price (N)', value: 'unitPrice' },
        { text: 'Amount', value: 'amount' },
        { text: 'Vat %', value: 'vat' },
        { text: 'Vat Amount (N)', value: 'vatAmount' },
        { text: 'Gross Amount (N)', value: 'grossAmount' },
        { text: 'WHT (%)', value: 'wht' },
        { text: 'WHT Amount', value: 'whtAmount' },
        { text: 'Net Amount', value: 'netAmount' }
      ]
    }
  }

}
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #e5e5e5;
  border-width: 2px;
}
</style>
