<template>
  <v-card>
    <v-card-title>Staff Applications Card</v-card-title>
    <v-card-text style="height: 250px; overflow-y: auto;">
      <div class="flex">
        <v-col cols="4" class="flex items-center">
          <ul class="space-y-2 text-sm pl-0">
            <p class="font-bold text-md mb-5 text-black text-base">500 Total applications</p>
            <li class="flex items-center">
              <span class="w-2 h-5 rounded-full mr-2" style="background-color: #f59e0b;"></span>
              <span class="text-black mt-1"><span class="font-bold text-base">80</span> Pending</span>
            </li>
            <li class="flex items-center">
              <span class="w-2 h-5 rounded-full mr-2" style="background-color: #10b981;"></span>
              <span class="text-black mt-1"><span class="font-bold text-base">370</span> Approved</span>
            </li>
            <li class="flex items-center">
              <span class="w-2 h-5 rounded-full mr-2" style="background-color: #ef4444;"></span>
              <span class="text-black mt-1"><span class="font-bold text-base">50</span> Rejected</span>
            </li>
          </ul>
        </v-col>
        <v-col class="flex items-center justify-center">
          <Doughnut :chart-data="data" :options="options" style="position: relative; height:200px; width:200px"/>
        </v-col>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default {
  components: {
    Doughnut
  },
  data () {
    return {
      data: {
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true
      }
    }
  }
}
</script>
