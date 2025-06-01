<template>
  <v-container fluid class="px-3 pt-3">
    <v-row class=" rounded-lg bg-white pt-4">
      <v-col cols="12" sm="3">
        <span>Quick search a staff</span>
        <v-text-field
          v-model="filterName"
          class="rounded-lg"
          label="Enter search word"
          append-icon="mdi-magnify"
          single-line
          hide-details
          outlined
          color="gray"
          @change="FilterName()"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <div class=" justify-start lg:pl-12 ">
          <span class="font-extrabold text-3xl ">
            {{ staffs.length }}
          </span>
          <span class="flex">
            Total number of staff
          </span>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <span>
          Filter staff
        </span>
        <v-select
          placeholder="Select Option"
          solo
          flat
          hide-details
          height="58"
          background-color="#F2F7FF"
          :items="FilterStaff"
          @input="FilterRole"
        />
      </v-col>
      <v-col cols="12" sm="3" align-self="center" align="center">
        <div class="w-full">
          <button class=" text-white w-full sm:w-52 sm:mt-4 flex justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="staffAdd">
            Add New Staff
          </button>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-7 bg-white rounded-xl">
      <v-col>
        <v-data-table
          class="w-full rounded-xl "
          :headers="headers"
          :items="staffs"
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
    <v-dialog v-model="confirmDialog" persistent max-width="300px">
      <v-card color="indigo lighten-5">
        <v-card-title>
          Delete Confirmation
        </v-card-title>
        <v-card-text class="justify-items-center">
          <template v-if="selectStaff">
            <div class="justify-items-center">
              Are you sure you want to delete
            </div>
            <strong>{{ selectStaff.firstName }}</strong>?
          </template>
          <template v-else>
            loading staff...
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn text color="red" :disabled="!selectStaff" @click="deleteStaff()">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      filterRole: '',
      filterName: '',
      staffs: [],
      itemsPerPage: 12,
      page: 1,
      confirmDialog: false,
      selectStaff: null,
      headers: [
        { text: 'S/N', value: 'sn', sortable: false },
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Gender', value: 'gender' },
        { text: 'Staff ID', value: 'staffID' },
        { text: 'Phone Number', value: 'phoneNumber' },
        { text: 'Role', value: 'role' },
        { text: 'Designation', value: 'designation' },
        { text: 'Action', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.staffs.length / this.itemsPerPage)
    }
  },
  mounted () {
    this.loadStaffs()
  },
  methods: {
    staffAdd () {
      this.$router.push('/staff/add')
    },
    staffUpdate (staff) {
      this.$router.push(`/staff/update?id=${staff.id}`)
    },
    async loadStaffs () {
      try {
        const response = await this.$axios.get('/staff/getAll')
        this.staffs = response.data
      } catch (error) {
        // console.log(error)
      }
    },
    async FilterRole (filterRole) {
      try {
        const clean = filterRole.replace(/\s*staff\b/gi, '')
        if (clean === 'All') {
          return this.loadStaffs()
        }
        const response = await this.$axios.get(`/staff/getByRol/${clean}`)
        this.staffs = response.data ? [response.data] : []
      } catch (error) {
        // console.log(error)
      }
    },
    async FilterName () {
      try {
        if (this.filterName === '') {
          return this.loadStaffs()
        }
        const response = await this.$axios.get(`/staff/getByName/${this.filterName}`)
        this.staffs = response.data ? [response.data] : []
      } catch (error) {
        // console.log(error)
      }
    },
    editItem (item) {
      alert(`Editar: ${item.name}`)
    },
    async deleteStaff () {
      try {
        await this.$axios.delete(`/staff/delete/${this.selectStaff.id}`)
        this.loadStaffs()
        this.closeDialog()
        // this.$store.dispatch('alert/triggerAlert', {
        //   message: 'Deleted',
        //   type: 'success'
        // })
      } catch (error) {
        // console.log(error)
      }
    },
    openDialog (staff) {
      this.confirmDialog = true
      this.selectStaff = staff
    },
    closeDialog () {
      this.confirmDialog = false
      this.selectStaff = null
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
