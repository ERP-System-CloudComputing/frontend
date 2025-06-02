<template>
  <v-container fluid class="px-3 pt-3">
    <v-row class=" rounded-lg bg-white pt-4">
      <v-col cols="12" sm="3">
        <div class=" justify-start lg:pl-12 ">
          <span class="font-extrabold text-3xl ">
            {{ vouchers.length }}
          </span>
          <span class="flex">
            Total number of staff
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
          @input="fVoucher"
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
        <v-data-table
          class="w-full rounded-xl"
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
          <template #top>
            <v-toolbar class="bg-blue rounded-lg" flat>
              <v-toolbar-title class="font-bold">
                All Payment Vouchers
              </v-toolbar-title>
              <v-spacer />
              <div class="flex items-center justify-end text-sm space-x-2">
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
            </v-toolbar>
          </template>
          <template #footer>
            <div class="flex justify-between items-center px-4 py-2 ">
              <v-pagination
                v-model="page"
                :length="pageCount"
              />
            </div>
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
                <v-list-item @click="staffUpdate(item)">
                  <v-icon small class="mr-2">
                    mdi-pencil
                  </v-icon>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openDialog(item)">
                  <v-icon small class="mr-2">
                    mdi-delete
                  </v-icon>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
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
        { text: 'Subject', value: 'subject' },
        { text: 'Prepared By', value: 'preparedBy' },
        { text: 'send To', value: 'sendTo' },
        { text: 'Action', value: 'actions' }
      ],
      filterVouchers: [
        'All memos'
      ],
      fVoucher: '',
      vouchers: []
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.vouchers.length / this.itemsPerPage)
    }
  },
  methods: {
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
