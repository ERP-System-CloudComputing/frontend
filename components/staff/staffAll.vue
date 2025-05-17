<template>
  <v-container fluid class="px-7 pt-10">
    <v-row class=" rounded-xl bg-white pt-4 h-32">
      <v-col md="3">
        <span>Quick search a staff</span>
        <v-text-field
          class="rounded-lg"
          label="Enter search word"
          append-icon="mdi-magnify"
          single-line
          hide-details
          outlined
          color="gray"
        />
      </v-col>
      <v-col>
        <div class=" justify-start lg:pl-12 ">
          <span class="font-extrabold text-3xl ">
            250
          </span>
          <span class="flex">
            Total number of staff
          </span>
        </div>
      </v-col>
      <v-col>
        <span>
          Filter staff
        </span>
        <v-select
          class=" rounded-lg"
          label="AllStaff"
          :items="FilterStaff"
          solo
          height="58"
          background-color="#F2F7FF"
          single-line
        />
      </v-col>
      <v-col align-self="center" align="center">
        <button class=" flex w-52 justify-center rounded-lg bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 hover:from-blue-600 shadow-md p-4">
          <span class="text-white">
            Add New Staff
          </span>
        </button>
      </v-col>
    </v-row>
    <v-row class="mt-7 bg-white rounded-xl">
      <v-data-table
        class="w-full rounded-xl"
        :headers="headers"
        :items="staffs"
        :items-per-page="12"
        hide-default-footer
        dense
      >
        <template #top>
          <v-toolbar class="bg-blue rounded-xl" flat>
            <v-toolbar-title>
              All Staff
            </v-toolbar-title>
            <v-spacer />
            <div class="flex items-center justify-end space-x-2">
              <span>Showing </span>
              <div>
                <v-select
                  v-model="itemsPerPage"
                  :items="[5,10,15,20]"
                  dense
                  outlined
                  hide-details
                  color="blue"
                  class="w-20"
                />
              </div>
              <span> per page</span>
            </div>
          </v-toolbar>
        </template>
        <template #footer>
          <div class="flex justify-between items-center px-4 py-2">
            <v-pagination
              v-model="page"
              :length="5"
              active-class="bg-blue-600 text-white font-bold rounded-md shadow"
            />
          </div>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      FilterStaff: [
        'All staff',
        'Admin staff',
        'I.T staff',
        'Human Resources staff'
      ],
      staff: [],
      headers: [
        { text: 'S/N', value: 'count' },
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Gender', value: 'gender' },
        { text: 'Staff ID', value: 'staffID' },
        { text: 'Phone Number', value: 'phoneNumber' },
        { text: 'Role', value: 'role' },
        { text: 'Designation', value: 'designation' },
        { text: 'Action', value: 'actions' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
