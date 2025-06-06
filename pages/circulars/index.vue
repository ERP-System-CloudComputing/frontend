<template>
  <div>
    <div class="flex justify-between items-center mb-6 px-5 py-6 bg-white rounded-2xl">
      <div class="w-full flex flex-col md:flex-row gap-4 justify-between md:items-center">
        <div class="w-full md:max-w-xs">
          <label class="text-sm font-normal">Quick search a circular</label>
          <v-text-field
            v-model="selectFilters.search"
            placeholder="Enter search word"
            outlined
            dense
            append-icon="mdi-magnify"
            @input="filterCirculars"
          />
        </div>
        <div class="">
          <div class="text-2xl font-extrabold">
            {{ circulars.length }}
          </div>
          <div class="text-sm text-gray-500">
            Total circulars
          </div>
        </div>
        <div>
          <label class="text-sm font-normal">Filter circulars</label>
          <v-select
            v-model="selectFilters.selectedFilter"
            :items="filters"
            placeholder="All memos"
            outlined
            dense
            @change="filterCirculars"
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

    <v-card class="mt-6" flat>
      <v-card-text>
        <v-data-table
          class="w-full rounded-xl "
          :headers="headers"
          :items="circulars"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          hide-default-footer
          dense
        >
          <template #[`item.sn`]="{ index }">
            {{ (page - 1) * itemsPerPage + index + 1 }}
          </template>
          <template #top>
            <v-toolbar class="bg-blue rounded-xl" flat>
              <v-toolbar-title class="font-bold">
                All Circulars
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
          <template #[`item.type`]="{ item }">
            {{ item.type }}
            <v-icon>
              {{ item.type === 'Sent' ? 'mdi-arrow-top-right' : 'mdi-arrow-bottom-left' }}
            </v-icon>
          </template>
          <template #[`item.action`]="{ item }">
            <span
              class="text-blue-600 hover:text-blue-800 cursor-pointer"
              text
              @click="openModal(item)"
            >
              View More
            </span>
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

    <v-dialog v-model="viewMoreDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ selectedCircular.title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="viewMoreDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <p><strong>Enviado desde:</strong> {{ selectedCircular.sentFrom }}</p>
          <p><strong>Enviado a:</strong> {{ selectedCircular.sentTo }}</p>
          <p><strong>Fecha:</strong> {{ selectedCircular.date }}</p>
          <p><strong>Tipo:</strong> {{ selectedCircular.type }}</p>

          <v-divider class="my-3"></v-divider>

          <p><strong>Mensaje:</strong></p>
          <v-alert type="info" border="left" colored-border>
            {{ selectedCircular.message }}
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="viewMoreDialog = false">Cerrar</v-btn>
          <v-btn color="primary" text @click="goToUpdate">Actualizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  layout: 'principal',
  data () {
    return {
      viewMoreDialog: false,
      itemsPerPage: 12,
      page: 1,
      selectFilters: {
        search: '',
        selectedFilter: 'All memos'
      },
      selectedCircular: {
        title: '',
        sentFrom: [],
        sentTo: [],
        date: '',
        type: '',
        message: ''
      },
      filters: ['All memos', 'Sent', 'Received'],
      headers: [
        { text: 'S/N', value: 'sn', sortable: false },
        { text: 'Circular Title', value: 'title' },
        { text: 'Sent From', value: 'sentFrom' },
        { text: 'Sent To', value: 'sentTo' },
        { text: 'Date', value: 'date' },
        { text: 'Circular Type', value: 'type' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      allCirculars: [], // Store all circulars fetched from the API
      circulars: []
    }
  },
  mounted () {
    this.fetchCirculars()
  },
  methods: {
    async fetchCirculars () {
      try {
        const response = await this.$axios.get('/circular/getAll')
        const { data } = response

        this.allCirculars = [
          ...data.map(circular => ({
            ...circular,
            sn: this.circulars.length + 1, // Assign a serial number
            date: new Date(circular.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })
          }))
        ]

        this.circulars = [...this.allCirculars]
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar circulares',
          text: error.message || 'An error occurred while fetching circulars.'
        })
      }
    },
    filterCirculars () {
      // Filtrar tanto search como selectedFilter
      const search = this.selectFilters.search.toLowerCase()
      const selectedFilter = this.selectFilters.selectedFilter

      this.circulars = this.allCirculars.filter((circular) => {
        const searchMatch = circular.title.toLowerCase().includes(search)
        const filterMatch = selectedFilter === 'All memos' ||
          (selectedFilter === 'Sent' && circular.type === 'Sent') ||
          (selectedFilter === 'Received' && circular.type === 'Received')
        return searchMatch && filterMatch
      })
    },
    openModal (circular) {
      this.selectedCircular = { ...circular }
      this.viewMoreDialog = true
    },
    goToUpdate () {
      this.$router.push(`/circulars/update/${this.selectedCircular.id}`)
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
