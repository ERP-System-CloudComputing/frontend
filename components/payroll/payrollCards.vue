<template>
  <div class="flex flex-col md:flex-row gap-6 p-4">
    <!-- Sección izquierda - Cards (2x2) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-1/2">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between h-full"
      >
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
    </div>

    <!-- Sección derecha - Gráfica anual -->
    <div class="w-full md:w-1/2 bg-white rounded-2xl shadow-sm p-4">
      <h3 class="text-lg font-semibold mb-4">
        Annual payroll summary
      </h3>
      <div class="h-64 md:h-80">
        <!-- Contenedor con altura fija -->
        <BarChart :chart-data="chartData" :chart-options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { defineComponent } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'PayrollDashboard',
  components: {
    BarChart: Bar
  },
  data () {
    return {
      chartHeight: '60rem',
      cards: [
        {
          value: '5,205,350.00',
          label: 'Gross salary this month',
          icon: 'mdi-account-group',
          iconBg: 'bg-yellow-100',
          iconColor: 'orange',
          trendIcon: 'mdi-arrow-up',
          trendText: '2% more than last month',
          trendColor: 'text-green-600'
        },
        {
          value: '4,550,350.00',
          label: 'Net salary this month',
          icon: 'mdi-file-document-outline',
          iconBg: 'bg-blue-100',
          iconColor: 'blue',
          trendIcon: 'mdi-arrow-down',
          trendText: '2.1% more than last month',
          trendColor: 'text-green-600'
        },
        {
          value: '550,350.00',
          label: 'Total tax this month',
          icon: 'mdi-rocket-launch',
          iconBg: 'bg-purple-100',
          iconColor: 'purple',
          trendIcon: 'mdi-arrow-up',
          trendText: '2.1% less than last month',
          trendColor: 'text-red-600'
        },
        {
          value: '150,350.00',
          label: 'Total loan this month',
          icon: 'mdi-sitemap-outline',
          iconBg: 'bg-green-100',
          iconColor: 'green',
          trendIcon: '',
          trendText: '1.5% less than last month',
          trendColor: 'text-red-600'
        }
      ],
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Net salary',
            backgroundColor: '#3B82F6', // Azul
            data: [45000, 42000, 47000, 49000, 52000, 50000, 53000, 55000, 54000, 56000, 58000, 60000]
          },
          {
            label: 'Tax',
            backgroundColor: '#EF4444', // Rojo
            data: [5000, 4500, 5200, 4800, 5500, 5000, 5300, 5500, 5400, 5600, 5800, 6000]
          },
          {
            label: 'Loan',
            backgroundColor: '#10B981', // Verde
            data: [2000, 1800, 1500, 1700, 1600, 1400, 1300, 1200, 1100, 1000, 900, 800]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return (value / 1000) + 'K' // Formato 60K
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 12,
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: $${context.raw.toLocaleString()}`
              }
            }
          }
        }
      }
    }
  }
})
</script>
