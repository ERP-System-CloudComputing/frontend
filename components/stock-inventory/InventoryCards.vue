<template>
  <v-row dense>
    <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="3">
      <div class="bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between h-36">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-2xl font-extrabold">
              {{ card.value }}
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              {{ card.label }}
            </p>
          </div>
          <div class="p-2 flex items-center justify-center rounded-full icono" :class="card.iconBg">
            <v-icon :color="card.iconColor" size="30">
              mdi-format-list-bulleted
            </v-icon>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    infoInventory: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      cards: [
        {
          value: this.infoInventory.totalCategories,
          label: 'Categories',
          iconBg: 'bg-blue-100',
          iconColor: 'blue'
        },
        {
          value: this.infoInventory.totalItems || '0',
          label: 'Total items',
          iconBg: 'bg-purple-100',
          iconColor: 'purple'
        },
        {
          value: this.infoInventory.totalItemCost || '0',
          label: 'Total item cost',
          iconBg: 'bg-yellow-100',
          iconColor: 'orange'
        },
        {
          value: this.infoInventory.totalSuppliers || '0',
          label: 'Total suppliers',
          iconBg: 'bg-green-100',
          iconColor: 'green'
        }
      ]
    }
  }
}
</script>

<style scoped>
.icono {
  flex: none !important;
}
</style>
