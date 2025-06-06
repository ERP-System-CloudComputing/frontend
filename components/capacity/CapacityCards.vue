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
  props: {
    countStatusType: {
      type: Object,
      required: true,
      default: () => ({ Scheduled: 0, Completed: 0, Pending: 0, Overdue: 0 })
    }
  },
  computed: {
    cards () {
      return [
        {
          value: this.countStatusType.Scheduled || 0,
          label: 'Scheduled maintenance',
          icon: 'mdi-cogs',
          iconBg: 'bg-blue-100',
          iconColor: 'blue',
          trendIcon: 'mdi-arrow-up',
          trendText: '2 more than last quarter',
          trendColor: 'text-green-600'
        },
        {
          value: this.countStatusType.Completed || 0,
          label: 'Completed maintenance',
          icon: 'mdi-cogs',
          iconBg: 'bg-green-100',
          iconColor: 'green',
          trendIcon: 'mdi-arrow-up',
          trendText: '2 more than last quarter',
          trendColor: 'text-green-600'
        },
        {
          value: this.countStatusType.Pending || 0,
          label: 'Pending maintenance',
          icon: 'mdi-cogs',
          iconBg: 'bg-yellow-100',
          iconColor: 'orange',
          trendIcon: 'mdi-arrow-up',
          trendText: '2 more than last quarter',
          trendColor: 'text-green-600'
        },
        {
          value: this.countStatusType.Overdue || 0,
          label: 'Overdue maintenance',
          icon: 'mdi-cogs',
          iconBg: 'bg-red-100',
          iconColor: 'red',
          trendIcon: 'mdi-arrow-up',
          trendText: '2 more than last quarter',
          trendColor: 'text-green-600'
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
