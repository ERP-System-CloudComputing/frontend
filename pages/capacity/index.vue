<template>
  <v-container class="space-y-7">
    <v-row>
      <CapacityCards :count-status-type="countStatusType" />
    </v-row>
    <v-row class="bg-white rounded-lg">
      <v-col cols="12">
        <div class="flex sm:flex-row flex-col sm:justify-between sm:items-center">
          <label class="text-xl font-bold">
            Training Request
          </label>
          <div class="sm:w-72">
            <button class=" text-white w-full sm:mt-4 justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="goToAdd()">
              Make Training Request
            </button>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-7 bg-white rounded-lg">
      <v-col>
        <div>
          <v-toolbar class="bg-blue rounded-lg" flat>
            <div class="flex flex-col sm:flex-row">
              <v-toolbar-title class="font-bold">
                All Trainings
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
          class="w-full rounded-xl h-72 overflow-y-auto overflow-x-hidden"
          :headers="headers"
          :items="capacityAll"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          hide-default-footer
          dense
        >
          <template #[`item.trainStatus`]="{ item }">
            <span
              :class="{
                'text-green-600': item.trainStatus === 'Completed',
                'text-gray-600': item.trainStatus === 'To-do',
                'text-yellow-600': item.trainStatus === 'Inprogress'
              }"
            >
              {{ item.trainStatus }}
            </span>
          </template>
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
                <v-list-item @click="goToUpdate(item)">
                  <v-icon small class="mr-2">
                    mdi-pencil
                  </v-icon>
                  <v-list-item-title>Edit</v-list-item-title>
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
  </v-container>
</template>

<script>
import CapacityCards from '~/components/capacity/CapacityCards.vue'
export default {
  components: {
    CapacityCards
  },
  layout: 'principal',
  data () {
    return {
      headers: [
        { text: 'S/N', value: 'sn', sortable: false },
        { text: 'Training Description', value: 'trainDescription' },
        { text: 'Start Date', value: 'trainDate' },
        { text: 'Training Type', value: 'trainType' },
        { text: 'Duration', value: 'trainDuration' },
        { text: 'Training Mode', value: 'trainMode' },
        { text: 'Status', value: 'trainStatus' },
        { text: 'Action', value: 'actions' }
      ],
      capacityAll: [],
      capacity: [],
      itemsPerPage: 12,
      page: 1,
      countStatusType: {
        Inprogress: 0,
        Todo: 0,
        Completed: 0
      }
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.capacityAll.length / this.itemsPerPage)
    }
  },
  mounted () {
    this.loadCapacity()
  },
  methods: {
    goToAdd () {
      this.$router.push('capacity/add')
    },
    getStatus (capacityCount) {
      return capacityCount.reduce((act, item) => {
        if (item.trainStatus === 'To-do') {
          item.trainStatus = 'Todo'
        }
        const status = item.trainStatus
        act[status] = (act[status] || 0) + 1
        return act
      }, {})
    },
    goToUpdate (capacityAll) {
      this.$router.push(`/capacity/update?id=${capacityAll.id}`)
    },
    async loadCapacity () {
      try {
        const response = await this.$axios.get('/capacity/getAll')
        this.capacityAll = response.data
        this.countStatusType = this.getStatus(this.capacityAll)
      } catch (error) {
        // console.log(error)
      }
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
