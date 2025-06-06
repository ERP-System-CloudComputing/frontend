<template>
  <v-app-bar
    app
    flat
    color="white"
    class="pt-6 pb-2 bg-white header"
  >
    <v-btn v-if="isMobile" icon @click="$emit('toggle-sidebar')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <div class="flex flex-col">
      <div class="flex items-center">
        <v-icon v-if="pageDetails().icon" class="mr-2" color="blue darken-4">
          {{ pageDetails().icon ? pageDetails().icon : 'mdi-home' }}
        </v-icon>
        <h1 class="font-extrabold text-xl">
          {{ pageDetails().title ? pageDetails().title : 'Dashboard' }}
        </h1>
      </div>
      <span v-if="!isMobile" class="font-normal text-sm mt-1">{{ pageDetails().subtitle }}</span>
    </div>

    <v-spacer />

    <div class="flex contenedor-texto">
      <button class="mr-3">
        <v-icon color="black">
          mdi-bell
        </v-icon>
      </button>

      <v-menu
        offset-y
        transition="slide-y-transition"
      >
        <template #activator="{ on, attrs }">
          <div class="flex justify-center items-center">
            <v-avatar size="32" class="mr-4">
              <img src="https://i.pravatar.cc/300" alt="Avatar">
            </v-avatar>
            <div class="flex-none flex flex-col items-start mr-4">
              <span class="inline-block text-sm">Otor John</span>
              <span class="inline-block text-xs text-gray-500">HR Office</span>
            </div>
            <button class="hover:bg-gray-300 p-1 transition rounded-sm" v-bind="attrs" v-on="on">
              <v-icon color="black">
                mdi-chevron-down
              </v-icon>
            </button>
          </div>
        </template>

        <div class="bg-white shadow-md rounded-md py-2">
          <nuxt-link
            to="profile"
          >
            <div class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <v-icon class="mr-2" color="black">
                mdi-account
              </v-icon>
              <span class="text-sm text-black">Profile</span>
            </div>
          </nuxt-link>
          <nuxt-link
            to="settings"
          >
            <div class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <v-icon class="mr-2" color="black">
                mdi-cog
              </v-icon>
              <span class="text-sm text-black">Settings</span>
            </div>
          </nuxt-link>
          <div class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="logout">
            <v-icon class="mr-2" color="black">
              mdi-logout
            </v-icon>
            <span class="text-sm">Logout</span>
          </div>
        </div>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import swal from 'sweetalert2'

export default {
  props: {
    isMobile: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    currentDate () {
      const now = new Date()

      const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' })
      const day = now.getDate()
      const month = now.toLocaleDateString('en-GB', { month: 'long' })
      const year = now.getFullYear()

      return `Today is ${weekday}, ${day} ${month} ${year}.`
    },
    pageDetails () {
      const route = this.$route.name

      const titles = {
        dashboard: {
          title: 'Welcome, Mr. Otor John 👋',
          subtitle: this.currentDate()
        },
        staff: {
          icon: 'mdi-account-group',
          title: 'All Staff',
          subtitle: 'View, search for and add new staff'
        },
        'staff-add': {
          icon: 'mdi-account-plus',
          title: 'Add Staff',
          subtitle: 'Fill out the form to create a new staff member.'
        },
        'staff-update': {
          icon: 'mdi-account-plus',
          title: 'Update Staff',
          subtitle: 'Fill out the form to create a new staff member.'
        },
        vouchers: {
          icon: 'mdi-cash',
          title: 'Payment Voucher',
          subtitle: 'Create payment voucher'
        },
        'vouchers-add': {
          icon: 'mdi-cash',
          title: 'Payment Voucher',
          subtitle: 'Create payment voucher'
        },
        budget: {
          icon: 'mdi-piggy-bank',
          title: 'Office Budget',
          subtitle: 'View, create and send budget request.'
        },
        'budget-create-id': {
          icon: 'mdi-piggy-bank',
          title: 'Create Budget',
          subtitle: 'Create and send budget request.'
        },
        circulars: {
          icon: 'mdi-receipt-text',
          title: 'Circulars',
          subtitle: 'Search for  and view all circulars.'
        },
        'circulars-create': {
          icon: 'mdi-receipt-text',
          title: 'Create Circulars',
          subtitle: 'Create and send circulars to designated offices.'
        },
        payroll: {
          icon: 'mdi-cash-multiple',
          title: 'Add Staff',
          subtitle: 'Generate and send payroll to account.'
        },
        'payroll-create': {
          icon: 'mdi-cash-multiple',
          title: 'Add Staff',
          subtitle: 'Generate and send payroll to account.'
        },
        'payroll-create-TaxDefinition': {
          icon: 'mdi-cash-multiple',
          title: 'Add Staff',
          subtitle: 'Generate and send payroll to account.'
        },
        'payroll-create-payslip': {
          icon: 'mdi-cash-multiple',
          title: 'Add Staff',
          subtitle: 'Generate and send payroll to account.'
        },
        'payroll-resume-payslip': {
          icon: 'mdi-cash-multiple',
          title: 'Add Staff',
          subtitle: 'Generate and send payroll to account.'
        },
        'payroll-create-payroll': {
          icon: 'mdi-cash-multiple',
          title: 'Add Staff',
          subtitle: 'Generate and send payroll to account.'
        },
        maintenance: {
          icon: 'mdi-cogs',
          title: 'Maintenance',
          subtitle: 'View and create schedule for maintenance.'
        },
        'maintenance-add': {
          icon: 'mdi-cogs',
          title: 'Maintenance',
          subtitle: 'View and create schedule for maintenance.'
        },
        capacity: {
          icon: 'mdi-human-capacity-increase',
          title: 'Capacity Building',
          subtitle: 'Create and submit request for staff training'
        },
        'capacity-add': {
          icon: 'mdi-human-capacity-increase',
          title: 'Capacity Building',
          subtitle: 'Create and submit request for staff training'
        },
        'capacity-update': {
          icon: 'mdi-human-capacity-increase',
          title: 'Capacity Building',
          subtitle: 'Create and submit request for staff training',
        },
        'circulars-update-id': {
          icon: 'mdi-receipt-text',
          title: 'Update Circular',
          subtitle: 'Update and send circulars to designated offices.'
        },
        logistics: {
          icon: 'mdi-truck',
          title: 'Logistics',
          subtitle: 'Make and send logistics request.'
        },
        'logistics-id': {
          icon: 'mdi-truck',
          title: 'Logistics Details',
          subtitle: 'View details of logistic request.'
        },
        'logistics-create': {
          icon: 'mdi-truck',
          title: 'Logistics Request',
          subtitle: 'Make and send logistics request.'
        },
        memo: {
          icon: 'mdi-notebook-edit',
          title: 'Memo',
          subtitle: 'Create and send memos to designated offices.'
        },
        'memo-create': {
          icon: 'mdi-notebook-edit',
          title: 'Create Memo',
          subtitle: 'Create and send memos to designated offices.'
        },
        'memo-id': {
          icon: 'mdi-notebook-edit',
          title: 'Memo Details',
          subtitle: 'Create and send memos to designated offices.'
        },
        'stock-inventory': {
          icon: 'mdi-format-list-bulleted',
          title: 'Stocks and Inventory',
          subtitle: 'Update stoke and inventory table.'
        },
        'stock-create': {
          icon: 'mdi-format-list-bulleted',
          title: 'Update Stock',
          subtitle: 'Add new item to stocks.'
        },
        'inventory-create': {
          icon: 'mdi-format-list-bulleted',
          title: 'Update Inventory',
          subtitle: 'Add new item to stocks.'
        },
        notifications: {
          icon: 'mdi-bell',
          title: 'Notifications',
          subtitle: 'View all notifications.'
        }
      }

      return titles[route]
    },
    async logout () {
      try {
        // console.log('Cookie antes de enviar: ', document.cookie)
        const confirmDialog = await swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out of the system.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout!'
        })

        if (!confirmDialog.isConfirmed) {
          return
        }

        // * 1. Hacemos peticion a backend:
        await this.$axios.post('/staff/logout', {
          withCredentials: true // * Enviamos credenciales al servido
        })

        // console.log('Respuesta del servidor: ', response.data) // * Respuesta del servidor

        // * 2. Limpiamos almacenamiento local:
        localStorage.removeItem('auth._token.local')
        localStorage.removeItem('auth._token_expiration.local')
        localStorage.clear()

        // * 4. Rediridimos al user a login:
        await this.$router.push('/')
      } catch (error) {
        const message = 'Something went wrong!' || error.message.data
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message
        })
        // console.error('Error al cerrar sesión: ', error)
        // console.error('Error completo: ', error.response)
      }
    }
  }
}
</script>

<style scoped>
.contenedor-texto {
  flex: none !important;
}
.header {
  height: auto !important;
}
</style>
