<template>
  <v-row dense>
    <v-col
      v-for="(card, index) in cards"
      :key="index"
      cols="12"
      sm="6"
      md="3"
    >
      <div class="bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between h-full">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-2xl font-extrabold">
              {{ card.value }}
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              {{ card.label }}
            </p>
          </div>
          <div
            class="p-2 flex items-center justify-center rounded-full icono"
            :class="card.iconBg"
          >
            <v-icon :color="card.iconColor" size="30">
              {{ card.icon }}
            </v-icon>
          </div>
        </div>
        <div class="mt-4 text-sm flex items-center" :class="card.trendColor">
          <v-icon small class="mr-1">
            {{ card.trendIcon }}
          </v-icon>
          {{ card.trendText }}
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
          value: '250',
          label: 'Total number of staff',
          icon: 'mdi-account-group',
          iconBg: 'bg-yellow-100',
          iconColor: 'orange',
          trendIcon: 'mdi-arrow-up',
          trendText: '12 more than last quarter',
          trendColor: 'text-green-600'
        },
        {
          value: '100',
          label: 'Total application',
          icon: 'mdi-file-document-outline',
          iconBg: 'bg-blue-100',
          iconColor: 'blue',
          trendIcon: 'mdi-arrow-down',
          trendText: '0.2% lower than last quarter',
          trendColor: 'text-red-600'
        },
        {
          value: '10',
          label: 'Total projects',
          icon: 'mdi-rocket-launch',
          iconBg: 'bg-purple-100',
          iconColor: 'purple',
          trendIcon: 'mdi-arrow-up',
          trendText: '2% more than last quarter',
          trendColor: 'text-green-600'
        },
        {
          value: '10',
          label: 'Total departments',
          icon: 'mdi-sitemap-outline',
          iconBg: 'bg-green-100',
          iconColor: 'green',
          trendIcon: '',
          trendText: '',
          trendColor: ''
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
