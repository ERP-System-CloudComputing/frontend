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
            <div v-if="index === 3">
              <h2 class="text-2xl font-extrabold">
                {{ card.value }} %
              </h2>
            </div>
            <div v-else>
              <h2 class="text-2xl font-extrabold">
                {{ card.value }}
              </h2>
            </div>
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
      default: () => ({ Inprogress: 0, Todo: 0, Completed: 0 })
    }
  },
  computed: {
    countStatusWithPorcent () {
      const completed = Number(this.countStatusType.Completed || 0)
      const inprogress = Number(this.countStatusType.Inprogress || 0)
      const porcent = inprogress === 0 ? 0 : ((completed / inprogress) * 100).toFixed(1)

      return {
        ...this.countStatusType,
        Porcent: porcent
      }
    },
    cards () {
      return [
        {
          value: this.countStatusType.Todo || 0,
          label: 'Total training request',
          icon: 'mdi-cogs',
          iconBg: 'bg-blue-100',
          iconColor: 'blue'
        },
        {
          value: this.countStatusType.Inprogress || 0,
          label: 'Total staff trained',
          icon: 'mdi-cogs',
          iconBg: 'bg-yellow-100',
          iconColor: 'orange'
        },
        {
          value: this.countStatusType.Completed || 0,
          label: 'Total training done',
          icon: 'mdi-cogs',
          iconBg: 'bg-purple-100',
          iconColor: 'purple'
        },
        {
          value: this.countStatusWithPorcent.Porcent || 0,
          label: 'Staff training date',
          icon: 'mdi-cogs',
          iconBg: 'bg-yellow-100',
          iconColor: 'yellow'
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
