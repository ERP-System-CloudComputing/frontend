<template>
  <v-container fluid>
    <v-row class="bg-white rounded-lg">
      <v-col>
        <v-form ref="formVou" v-model="formValidar">
          <v-row>
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
                v-model="voucherData.subject"
                class="rounded-lg"
                placeholder="Enter subject"
                dense
                outlined
                :rules="[required('subject')]"
              />
            </v-col>
            <v-col cols="12">
              <v-data-table
                class="w-full rounded-xl max-h-40 overflow-y-auto overflow-x-hidden"
                :headers="headers"
                :items="formBuyDataList"
                hide-default-footer
                dense
              >
                <template #[`item.sn`]="{ index }">
                  {{ index + 1 }}
                </template>
              </v-data-table>
            </v-col>
            <v-col cols="12" md="3">
              <div class="border sm:w-60 border-gray-300 rounded-xl p-4 hover:bg-gray-100">
                <button type="button" @click="openDialog()">
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
                <v-col cols="12" sm="3" class="flex sm:justify-around sm:flex-row flex-col">
                  <span class="font-bold text-lg">
                    {{ totalUnitPrice }}
                  </span>
                  <span class="font-bold text-lg">
                    {{ totalAmount }}
                  </span>
                </v-col>
                <v-col cols="12" sm="3">
                  <span class="font-bold text-lg">
                    {{ totalVatAmount }}
                  </span>
                </v-col>
                <v-col cols="12" sm="3" class="flex justify-between sm:flex-row flex-col">
                  <span class="font-bold text-lg">
                    {{ totalWhtAmount }}
                  </span>
                  <span class="font-bold text-lg">
                    {{ totalNetAmount }}
                  </span>
                </v-col>
              </v-row>
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
                    v-model="voucherData.sendTo"
                    class="rounded-lg"
                    placeholder="Enter name"
                    dense
                    :rules="[required('Account name')]"
                    outlined
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <span>
                    Account number
                  </span>
                  <v-text-field
                    v-model="voucherData.accountNumber"
                    class="rounded-lg"
                    placeholder="Enter number"
                    dense
                    :rules="[requiredNumber('Account number')]"
                    outlined
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <span>
                    Bank name
                  </span>
                  <v-text-field
                    v-model="voucherData.bankName"
                    class="rounded-lg"
                    placeholder="Enter bank name"
                    dense
                    :rules="[required('Bank name')]"
                    outlined
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <div>
          <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="validForm('formVou','Vou')">
            Submit Payment Voucher
          </button>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="confirmDialog"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-title>
          Create Payment Voucher
        </v-card-title>
        <v-card-text>
          <v-form ref="formReg" v-model="formValidar">
            <v-row>
              <v-col cols="12" sm="4">
                <span>Class</span>
                <v-text-field
                  v-model="formBuyData.classbuy"
                  class="rounded-lg"
                  placeholder="Enter class"
                  dense
                  :rules="[required('Class')]"
                  outlined
                />
              </v-col>
              <v-col cols="12" sm="4">
                <span>Description</span>
                <v-text-field
                  v-model="formBuyData.description"
                  class="rounded-lg"
                  placeholder="Enter description"
                  dense
                  :rules="[required('Description')]"
                  outlined
                />
              </v-col>
              <v-col cols="12" sm="4">
                <span>QTY</span>
                <v-text-field
                  v-model="formBuyData.qty"
                  class="rounded-lg"
                  placeholder="Enter QTY"
                  dense
                  :rules="[required('QTY')]"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="12" sm="4">
                <span class="font-bold">Unit Price (N)</span>
                <v-text-field
                  v-model="formBuyData.unitPrice"
                  class="rounded-lg"
                  placeholder="Enter unit price"
                  dense
                  :rules="[requiredNumber('Unit price')]"
                  outlined
                />
              </v-col>
              <v-col class="12" sm="4">
                <span class="font-bold">Amount (N)</span>
                <v-text-field
                  v-model="formBuyData.amount"
                  class="rounded-lg"
                  dense
                  outlined
                  disabled
                />
              </v-col>
              <v-col class="12" sm="4">
                <span class="font-bold">VAT %</span>
                <v-text-field
                  v-model="formBuyData.vat"
                  class="rounded-lg"
                  placeholder="Enter QTY"
                  dense
                  :rules="[requiredNumber('VAT')]"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4">
                <span class="font-bold">VAT Amount (N)</span>
                <v-text-field
                  v-model="formBuyData.vatAmount"
                  class="rounded-lg"
                  dense
                  outlined
                  disabled
                />
              </v-col>
              <v-col cols="12" sm="4">
                <span class="font-bold">Gross Amount (N)</span>
                <v-text-field
                  v-model="formBuyData.grossAmount"
                  class="rounded-lg"
                  dense
                  outlined
                  disabled
                />
              </v-col>
              <v-col cols="12" sm="4">
                <span class="font-bold">WHT %</span>
                <v-text-field
                  v-model="formBuyData.wht"
                  class="rounded-lg"
                  placeholder="Enter WHT"
                  dense
                  :rules="[requiredNumber('WHT')]"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <span class="font-bold">WHT Amount (N)</span>
                <v-text-field
                  v-model="formBuyData.whtAmount"
                  class="rounded-lg"
                  dense
                  outlined
                  disabled
                />
              </v-col>
              <v-col cols="12" sm="6">
                <span class="font-bold">Net Amount (N)</span>
                <v-text-field
                  v-model="formBuyData.netAmount"
                  class="rounded-lg"
                  dense
                  outlined
                  disabled
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <div class="flex space-x-4">
            <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-red-800 hover:from-red-900 shadow-md p-4" @click="closeDialog()">
              Cancel
            </button>
            <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="validForm('formReg','Reg')">
              Create
            </button>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      headers: [
        { text: 'S/N', value: 'sn', sortable: false },
        { text: 'Class', value: 'classbuy' },
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
      ],
      confirmDialog: false,
      formValidar: false,
      voucherData: {
        userId: '',
        subject: '',
        date: '',
        preparedBy: '',
        sendTo: '',
        accountNumber: '',
        bankName: ''
      },
      totalUnitPrice: 0,
      totalAmount: 0,
      totalVatAmount: 0,
      totalWhtAmount: 0,
      totalNetAmount: 0,
      formBuyDataList: [],
      formBuyData:
        {
          classbuy: '',
          description: '',
          qty: '',
          unitPrice: '',
          amount: '',
          vat: '',
          vatAmount: '',
          grossAmount: '',
          wht: '',
          whtAmount: '',
          netAmount: ''
        }
    }
  },
  watch: {
    formBuyData: { // - Calculando costos
      handler () {
        this.formBuyData.amount = parseFloat(this.formBuyData.unitPrice) || ''
        this.formBuyData.vatAmount = parseFloat(this.formBuyData.amount) * (parseFloat(this.formBuyData.vat) / 100).toFixed(2) || ''
        this.formBuyData.grossAmount = parseFloat(this.formBuyData.amount) + parseFloat(this.formBuyData.vatAmount) || ''
        this.formBuyData.whtAmount = parseFloat(this.formBuyData.amount) * (parseFloat(this.formBuyData.wht) / 100).toFixed(2) || ''
        this.formBuyData.netAmount = parseFloat(this.formBuyData.grossAmount) - parseFloat(this.formBuyData.whtAmount).toFixed(2) || ''
      },
      deep: true
    },
    formBuyDataList: { // - Calculando costos totales por columna
      handler (newVal) {
        this.totalUnitPrice = newVal.reduce((sum, item) => sum + Number(item.unitPrice || 0), 0)
        this.totalAmount = newVal.reduce((sum, item) => sum + Number(item.amount || 0), 0)
        this.totalVatAmount = newVal.reduce((sum, item) => sum + Number(item.vatAmount || 0), 0)
        this.totalVatAmount = newVal.reduce((sum, item) => sum + Number(item.vatAmount || 0), 0)
        this.totalWhtAmount = newVal.reduce((sum, item) => sum + Number(item.whtAmount || 0), 0)
        this.totalNetAmount = newVal.reduce((sum, item) => sum + Number(item.netAmount || 0), 0)
      },
      deep: true
    }
  },
  methods: {
    returnAll () {
      this.$router.push('/vouchers')
    },
    getDate () {
      const today = new Date()
      const day = String(today.getDate()).padStart(2, '0')
      const month = String(today.getMonth() + 1).padStart(2, '0') // Los meses van de 0-11
      const year = String(today.getFullYear()).slice(-2) // Últimos 2 dígitos

      return `${day}/${month}/${year}`
    },
    required (campo, min) {
      return (v) => {
        if (!v) { return `${campo} is Required` }
        if (v.length < min) { return `${campo} must be at least ${min} characters` }
        return true
      }
    },
    requiredNumber (campo) {
      return (v) => {
        if (!v) { return `${campo} is required` }
        if (!/^\d+$/.test(v)) { return `${campo} must only contain numbers` }
        return true
      }
    },
    openDialog () {
      this.formValidar = false
      this.confirmDialog = true
      this.formBuyData = {
        classbuy: '',
        description: '',
        qty: '',
        unitPrice: '',
        amount: '',
        vat: '',
        vatAmount: '',
        grossAmount: '',
        wht: '',
        whtAmount: '',
        netAmount: ''
      }
    },
    closeDialog () {
      this.confirmDialog = false
      this.formValidar = false
      this.formBuyData = {
        classbuy: '',
        description: '',
        qty: '',
        unitPrice: '',
        amount: '',
        vat: '',
        vatAmount: '',
        grossAmount: '',
        wht: '',
        whtAmount: '',
        netAmount: ''
      }
      this.$nextTick(() => {
        if (this.$refs.formReg) {
          this.$refs.formReg.resetValidation()
        }
      })
    },
    createBuy () {
      this.formBuyDataList.push({ ...this.formBuyData })
      //  console.log(this.formBuyDataList)
      this.confirmDialog = false
    },
    validForm (reform, forms) {
      const form = this.$refs[reform]
      if (form && form.validate()) {
        if (forms === 'Reg') {
          this.createBuy()
        } else if (forms === 'Vou') {
          this.createPaymentVoucher()
        }
      } else {
        alert('Complete all fields')
      }
    },
    async createPaymentVoucher () {
      try {
        this.voucherData.date = this.getDate()
        if (!this.formBuyDataList || this.formBuyDataList.length === 0) {
          return alert('Complete all fields in form Add another row')
        }
        const voucherFull = {
          voucher: this.voucherData,
          dataList: this.formBuyDataList
        }
        await this.$axios.post('/vouchers/create', voucherFull)
        alert('Success')
        this.$router.push('/vouchers')
      } catch (error) {
        console.log(error)
      }
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
