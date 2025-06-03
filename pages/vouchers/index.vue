<template>
  <v-container fluid class="px-3 pt-3">
    <v-row class=" rounded-lg bg-white pt-4">
      <v-col cols="12" sm="3">
        <div class=" justify-start lg:pl-12 ">
          <span class="font-extrabold text-3xl ">
            {{ vouchers.length }}
          </span>
          <span class="flex">
            Total payment vouchers
          </span>
        </div>
      </v-col>
      <v-col cols="12" sm="3" class="sm:pr-10">
        <span>
          Filter payment voucher
        </span>
        <v-select
          placeholder="Select Option"
          solo
          flat
          hide-details
          height="57"
          background-color="#F2F7FF"
          :items="filterVouchers"
          @input="loadVouchers"
        />
      </v-col>
      <v-col cols="12" sm="3" align-self="center" align="center">
        <div class="w-full">
          <button class=" text-white w-full sm:w-auto sm:mt-4 flex justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="$router.push('vouchers/add')">
            Create Payment Voucher
          </button>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-7 bg-white rounded-lg">
      <v-col>
        <div>
          <v-toolbar class="bg-blue rounded-lg" flat>
            <div class="flex flex-col sm:flex-row">
              <v-toolbar-title class="font-bold">
                All Payment Vouchers
              </v-toolbar-title>
              <v-spacer />
              <div class="flex items-center sm:justify-end text-sm space-x-2">
                <span>Showing </span>
                <div>
                  <v-select
                    v-model="itemsPerPage"
                    :items="[1,6,12,18,22]"
                    dense
                    hide-details
                    class="w-12 gradient-border"
                  />
                </div>
                <span> per page</span>
              </div>
            </div>
          </v-toolbar>
        </div>
        <v-data-table
          class="w-full rounded-xl h-96 overflow-y-auto overflow-x-hidden"
          :headers="headers"
          :items="vouchers"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          hide-default-footer
          dense
        >
          <template #[`item.sn`]="{ index }">
            {{ (page - 1) * itemsPerPage + index + 1 }}
          </template>
          <template #[`item.actions`]="{ item }">
            <v-menu offset-y>
              <template #activator="{ on, attrs }">
                <div class=" bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent  hover:from-blue-500 hover:to-blue-900 transition-all duration-300">
                  <span
                    v-bind="attrs"
                    v-on="on"
                  >
                    View More
                  </span>
                </div>
              </template>
              <v-list>
                <v-list-item @click="openDialog('show', item)">
                  <v-icon small class="mr-2">
                    mdi-pencil
                  </v-icon>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openDialog('delete', item)">
                  <v-icon small class="mr-2">
                    mdi-delete
                  </v-icon>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
        <div class="flex justify-between items-center px-4 py-2 ">
          <v-pagination
            v-model="page"
            :length="pageCount"
          />
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogShow" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h6">
            Show Voucher
          </span>
        </v-card-title>
        <v-card-text>
          <v-data-table
            class="w-full rounded-lg"
            :headers="headersVoucher"
            :items="formBuyData"
            hide-default-footer
            dense
          />
        </v-card-text>
        <v-card-actions>
          <div class="sm:flex w-full sm:justify-center">
            <button class=" text-white sm:w-52 w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-red-800 hover:from-red-900 shadow-md p-4" @click="closeDialog()">
              back
            </button>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialog" persistent max-width="300px">
      <v-card color="indigo lighten-5">
        <v-card-title>
          Delete Voucher
        </v-card-title>
        <v-card-text class="justify-items-center">
          <template v-if="selectVoucher">
            <div class="justify-items-center">
              Are you sure you want to delete
            </div>
            <strong>{{ selectVoucher.subject }}</strong>?
          </template>
          <template v-else>
            loading staff...
          </template>
        </v-card-text>
        <v-card-actions>
          <div class="flex space-x-4 justify-items-center">
            <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-red-800 hover:from-red-900 shadow-md p-4" @click="closeDialog()">
              Cancel
            </button>
            <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="deleteVoucher()">
              Delete
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
        { text: 'Subject', value: 'subject' },
        { text: 'Prepared By', value: 'preparedBy' },
        { text: 'send To', value: 'sendTo' },
        { text: 'Action', value: 'actions' }
      ],
      headersVoucher: [
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
      filterVouchers: [
        'All memos'
      ],
      formBuyData: [],
      itemsPerPage: 12,
      page: 1,
      fVoucher: '',
      dialogShow: false,
      selectVoucher: null,
      vouchers: []
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.vouchers.length / this.itemsPerPage)
    }
  },
  mounted () {
    this.loadVouchers()
  },
  methods: {
    async loadVouchers () {
      try {
        const response = await this.$axios.get('/vouchers/getAll')
        this.vouchers = response.data
      } catch (error) {
        // console.log(error)
      }
    },
    async showProductsVoucher (voucher) {
      try {
        // console.log(voucher.id)
        const all = await this.$axios.get(`/vouchers/getById/${voucher.id}`)
        this.formBuyData = all.data
      } catch (error) {
        console.log(error)
      }
    },
    async deleteVoucher () {
      try {
        await this.$axios.delete(`/vouchers/delete/${this.selectVoucher.id}`)
      } catch (error) {
        console.log(error)
      }
    },
    openDialog (mode, voucher = null) {
      this.dialogMode = mode
      if (mode === 'delete' && voucher) {
        this.confirmDialog = true
        this.selectVoucher = voucher
      } else if (mode === 'show' && voucher) {
        this.dialogShow = true
        this.showProductsVoucher(voucher)
      }
    },
    closeDialog () {
      this.confirmDialog = false
      this.dialogShow = false
      this.selectVoucher = null
    }
  }
}
</script>

<style scoped>
::v-deep(.v-pagination .v-pagination__item--active) {
  background-image: linear-gradient(to bottom right, #60a5fa, #2563eb, #1e40af);
  color: white;
  font-weight: bold;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
::v-deep(.v-data-table-header th) {
  color: black !important;
  font-weight: bold !important;
}
::v-deep(.v-data-table td) {
  color: #4B4B4B !important;
}
::v-deep(.gradient-border .v-input__control) {
  padding: 2px;
  border-radius: 0.5rem;
  background: linear-gradient(to bottom right, #38bdf8, #2563eb, #1e3a8a);
}
::v-deep(.gradient-border .v-input__slot) {
  border-radius: 0.4rem;
  background-color: white;
  padding: 4px 10px;
  color: #1e3a8a;
  font-weight: 500;
}
::v-deep(.gradient-border .v-input__control::before),
::v-deep(.gradient-border .v-input__control::after) {
  border: none !important;
}
::v-deep(.gradient-border label) {
  color: #1e3a8a;
  font-weight: 600;
}
::v-deep(.gradient-border .v-select__selection) {
  background: linear-gradient(to bottom right, #38bdf8, #2563eb, #1e3a8a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
::v-deep(.v-select .v-input__append-inner) {
  display: none;
}
</style>
