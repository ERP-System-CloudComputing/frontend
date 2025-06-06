<template>
  <v-container class="space-y-7">
    <v-row>
      <CapacityCards />
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
        { text: 'Start Date', value: 'startDate' },
        { text: 'Training Type', value: 'trainingType' },
        { text: 'Duration', value: 'duration' },
        { text: 'Training Mode', value: 'trainingMode' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'actions' }
      ]
    }
  },
  methods: {
    goToAdd () {
      this.$router.push('capacity/add')
    }
  }
}
</script>

<style scoped>
</style>
