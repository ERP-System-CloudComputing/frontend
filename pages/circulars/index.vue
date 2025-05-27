<template>
  <div>
    <div class="flex justify-between items-center mb-6 px-5 py-6 bg-white rounded-2xl">
      <div class="w-full flex flex-col md:flex-row gap-4 justify-between md:items-center">
        <div class="w-full md:max-w-xs">
          <label class="text-sm font-normal">Quick search a circular</label>
          <v-text-field
            v-model="search"
            placeholder="Enter search word"
            outlined
            dense
            append-icon="mdi-magnify"
          />
        </div>
        <div class="">
          <div class="text-2xl font-extrabold">
            250
          </div>
          <div class="text-sm text-gray-500">
            Total circulars
          </div>
        </div>
        <div>
          <label class="text-sm font-normal">Filter circulars</label>
          <v-select
            v-model="selectedFilter"
            :items="filters"
            placeholder="All memos"
            outlined
            dense
          />
        </div>
        <nuxt-link
          to="/circulars/create"
          class="flex justify-center items-center py-3 h-11 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white button"
        >
          Create Circular
        </nuxt-link>
      </div>
    </div>

    <v-card class="mt-6">
      <v-card-title>Budget Request</v-card-title>

      <v-card-text>
        <v-data-table
          class="w-full rounded-xl "
          :headers="headers"
          :items="circulars"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          hide-default-footer
          dense
          show-select
        >
          <template #[`item.sn`]="{ index }">
            {{ (page - 1) * itemsPerPage + index + 1 }}
          </template>
          <template #top>
            <v-toolbar class="bg-blue rounded-xl" flat>
              <v-toolbar-title class="font-bold">
                All Staff
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
                    class="w-12 gradient-border "
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
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      itemsPerPage: 12,
      page: 1,
      selectedFilter: '',
      search: '',
      filters: ['All memos', 'Sent', 'Received'],
      headers: [
        { text: 'S/N', value: 'sn', sortable: false },
        { text: 'Circular Title', value: 'title' },
        { text: 'Sent From', value: 'from' },
        { text: 'Sent To', value: 'to' },
        { text: 'Date', value: 'date' },
        { text: 'Circular Type', value: 'type' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      circulars: [
        { sn: '01', title: 'HR Circular for Operations', from: 'Admin, HR', to: 'Ops Staffs', date: '16/11/2022', type: 'Sent' },
        { sn: '02', title: 'Management Circular', from: 'Admin, HR', to: 'HR Staffs', date: '16/11/2022', type: 'Sent' },
        { sn: '03', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '04', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '05', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' },
        { sn: '06', title: 'Maintenance Notice', from: 'Management', to: 'All Staff', date: '16/11/2022', type: 'Received' }
      ]
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.circulars.length / this.itemsPerPage)
    }
  }
}
</script>

<style scoped>
.color-white {
  color: white !important;
}
.button {
  flex: none !important;
  width: 100% !important;
  max-width: 180px !important;
}
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
