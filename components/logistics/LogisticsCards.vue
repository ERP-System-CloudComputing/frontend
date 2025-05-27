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
              mdi-basket-check
            </v-icon>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      cards: [
        {
          value: '350',
          label: 'Total request made',
          iconBg: 'bg-blue-100',
          iconColor: 'blue'
        },
        {
          value: '5,000,000',
          label: 'Total cost incurred',
          iconBg: 'bg-purple-100',
          iconColor: 'purple'
        },
        {
          value: '70',
          label: 'Pending request',
          iconBg: 'bg-yellow-100',
          iconColor: 'orange'
        },
        {
          value: '280',
          label: 'Approved request',
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
