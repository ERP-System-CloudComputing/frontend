<template>
  <v-navigation-drawer app permanent class="border-none">
    <LogoERPVue class="py-14"/>

    <v-list dense>
      <nuxt-link
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.path"
        class="block"
      >
        <v-list-item
          :class="[
            'my-1 ',
            $route.path === item.path ? 'bg-blue-100 text-white border-l-4 border-blue-500' : 'hover:bg-gray-100'
          ]"
        >
          <v-list-item-icon class="mr-2">
            <v-icon :color="$route.path === item.path ? 'blue darken-4' : 'black'">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title :class="$route.path === item.path ? 'text-blue-800' : 'text-black'">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import LogoERPVue from './LogoERP.vue'

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/dashboard' },
  { title: 'Staff', icon: 'mdi-account-group', path: '/staff' },
  { title: 'Payment Voucher', icon: 'mdi-cash', path: '/vouchers' },
  { title: 'Payroll', icon: 'mdi-currency-usd', path: '/payroll' },
  { title: 'Memo', icon: 'mdi-file-document-outline', path: '/memos' },
  { title: 'Circulars', icon: 'mdi-email', path: '/circulars' },
  { title: 'Maintenance', icon: 'mdi-wrench', path: '/maintenance' },
  { title: 'Logistics', icon: 'mdi-truck-delivery', path: '/logistics' },
  { title: 'Office Budget', icon: 'mdi-piggy-bank', path: '/budget' },
  { title: 'Stocks and Inventory', icon: 'mdi-warehouse', path: '/stocks' },
  { title: 'Notifications', icon: 'mdi-bell', path: '/notifications' },
  { title: 'Capacity Building', icon: 'mdi-school-outline', path: '/capacity' },
  { title: 'Procurements', icon: 'mdi-cart-outline', path: '/procurements' }
]

export default {
  components: {
    LogoERPVue
  },
  data () {
    return {
      menuItems
    }
  }
}
</script>
