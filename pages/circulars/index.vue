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
          :headers="headers"
          :items="circulars"
          class="elevation-0"
          show-select
        >
          <template #[`item.action`]="{ item }">
            <nuxt-link
              :to="`/circulars/update/${item.sn}`"
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
export default {
  layout: 'principal',
  data () {
    return {
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
</style>
