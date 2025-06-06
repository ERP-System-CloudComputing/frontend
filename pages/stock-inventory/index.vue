<template>
  <div class="bg-gray-50 mb-6">
    <div class="mx-auto">
      <div class="flex border-b border-gray-200 mb-8">
        <button
          @click="activeTab = 'stocks'"
          :class="[
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'stocks'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          ]"
        >
          Stocks
        </button>
        <button
          @click="activeTab = 'inventory'"
          :class="[
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors ml-8',
            activeTab === 'inventory'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          ]"
        >
          Inventory
        </button>
      </div>

      <div v-if="activeTab === 'stocks'">

        <!-- Statistics Cards -->
        <StockCardsVue v-if="infoStock.totalItems" :info-stock="infoStock"/>

        <!-- Update Stock Section -->
        <div class="flex justify-between items-center flex-col sm:flex-row mt-6 bg-white py-9 px-5 rounded-2xl shadow-sm">
          <h3 class="text-xl font-semibold">
            Update Stock List
          </h3>

          <nuxt-link
            to="/stock/create"
            class="px-16 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                    hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
            style="color: white !important;"
          >
            Update Stock
          </nuxt-link>
        </div>

        <!-- Stock List Table -->
        <v-card class="bg-white rounded-lg shadow-sm mt-6" flat>
          <v-card-title class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Stock List</h3>
          </v-card-title>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY Purchased</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In-Stock</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in stockItems" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.sn }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="item.image" class="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <img :src="item.image" alt="Product Image" class="w-full h-full object-cover rounded">
                    </div>
                    <div v-else class="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <v-icon
                        class="w-6 h-6 text-gray-600"
                        :color="'gray'"
                        :size="'24px'"
                      >
                        {{ item.icon }}
                      </v-icon>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.category }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.quantity }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(item.unitPrice) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(item.totalCost) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.inStock }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.supplier }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(item.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card>
      </div>

      <div v-if="activeTab === 'inventory'">
        <!-- Statistics Cards -->
        <InventoryCardsVue />
        <!-- Update Inventory Section -->
        <div class="flex justify-between items-center flex-col sm:flex-row mt-6 bg-white py-9 px-5 rounded-2xl shadow-sm">
          <h3 class="text-xl font-semibold">
            Update Inventory Table
          </h3>

          <nuxt-link
            to="/stock/create"
            class="px-16 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                    hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
            style="color: white !important;"
          >
            Update Inventory
          </nuxt-link>
        </div>

        <!-- Inventory List Table -->
        <v-card class="bg-white rounded-lg shadow-sm overflow-hidden mt-6" flat>
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Inventory List</h3>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY Purchased</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in inventoryItems" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.sn }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <v-icon
                        class="w-6 h-6 text-gray-600"
                        :color="'gray'"
                        :size="'24px'"
                      >
                        {{ item.icon }}
                      </v-icon>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.category }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.qtyPurchased }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.unitPrice }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.totalAmount }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.supplier }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getInventoryStatusClass(item.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryCardsVue from '~/components/stock-inventory/InventoryCards.vue'
import StockCardsVue from '~/components/stock-inventory/StockCards.vue'

export default {
  components: {
    StockCardsVue,
    InventoryCardsVue
  },
  layout: 'principal',
  data () {
    return {
      activeTab: 'stocks',
      stockItems: [],
      inventoryItems: [
        {
          id: 1,
          sn: '01',
          icon: 'mdi-air-conditioner',
          name: 'LG Air condition',
          productId: '45656787',
          category: 'Office equipments',
          qtyPurchased: '5pcs',
          unitPrice: '₦50,000.00',
          totalAmount: '₦250,000.00',
          supplier: "Big Ben's Store",
          status: 'All functioning'
        },
        {
          id: 2,
          sn: '02',
          icon: 'mdi-car',
          name: 'Toyota Space Bus',
          productId: '63196787',
          category: 'Automobile',
          qtyPurchased: '2pcs',
          unitPrice: '₦1,500,000.00',
          totalAmount: '₦3,000,000.00',
          supplier: 'Innoson Vehicles',
          status: 'All functioning'
        },
        {
          id: 3,
          sn: '03',
          icon: 'mdi-television',
          name: '55inch Hisense TV',
          productId: '328422AA',
          category: 'Electronics',
          qtyPurchased: '3pcs',
          unitPrice: '₦150,000.00',
          totalAmount: '₦450,000.00',
          supplier: "Big Ben's Store",
          status: '2 functioning'
        },
        {
          id: 4,
          sn: '04',
          icon: 'mdi-chair-rolling',
          name: 'Office Chairs',
          productId: '45656787',
          category: 'Furnitures',
          qtyPurchased: '15pcs',
          unitPrice: '₦100,000.00',
          totalAmount: '₦1,500,000.00',
          supplier: 'Decorhub NG',
          status: 'All functioning'
        },
        {
          id: 5,
          sn: '05',
          icon: 'mdi-desktop-classic',
          name: 'HP 16inch Desktops',
          productId: '00247791',
          category: 'Electronics',
          qtyPurchased: '25pcs',
          unitPrice: '₦50,000.00',
          totalAmount: '₦1,250,000.00',
          supplier: 'HP Abuja Stores',
          status: '20 functioning'
        },
        {
          id: 6,
          sn: '06',
          icon: 'mdi-printer',
          name: 'Laser Jet Printers',
          productId: '45656787',
          category: 'Office equipments',
          qtyPurchased: '5pcs',
          unitPrice: '₦50,000.00',
          totalAmount: '₦250,000.00',
          supplier: "Big Ben's Store",
          status: 'All functioning'
        }
      ],
      infoStock: {
        totalCategories: 5,
        totalItems: 0,
        totalItemCost: 0,
        itemsLowInStock: 0
      }
    }
  },
  async mounted () {
    await this.getStockItems()
  },
  methods: {
    formatCurrency (value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'MXN'
      }).format(value)
    },
    getStatusClass (status) {
      switch (status) {
        case 'In Stock':
          return 'bg-green-100 text-green-800'
        case 'Out of Stock':
          return 'bg-red-100 text-red-800'
        case 'Low in Stock':
          return 'bg-yellow-100 text-yellow-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    getInventoryStatusClass (status) {
      if (status === 'All functioning') {
        return 'bg-green-100 text-green-800'
      } else if (status.includes('functioning')) {
        return 'bg-yellow-100 text-yellow-800'
      }
      return 'bg-gray-100 text-gray-800'
    },
    setStatus (inStock) {
      if (inStock === 0) {
        return 'Out of Stock'
      } else if (inStock < 10) {
        return 'Low in Stock'
      } else {
        return 'In Stock'
      }
    },
    async getStockItems () {
      try {
        const response = await this.$axios.get('/stock/getAll')
        if (response.status === 200) {
          this.stockItems = response.data.map((item, index) => ({
            ...item,
            sn: String(index + 1).padStart(2, '0'),
            status: this.setStatus(item.inStock)
          }))

          this.infoStock.totalItems = this.stockItems.length
          this.infoStock.totalItemCost = this.formatCurrency(
            this.stockItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0)
          )
          this.infoStock.itemsLowInStock = this.stockItems.filter(item => item.inStock < 10).length
        } else {
          console.error('Failed to fetch stock items:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching stock items:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
