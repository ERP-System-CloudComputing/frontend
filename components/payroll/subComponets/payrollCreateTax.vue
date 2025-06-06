<template>
  <div>
    <button
      class=" mb-3 w-52 py-3 text-xl text-left rounded-lg border hover:border-primario  <!-- Borde sutil que cambia en hover -->
                  hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer
                  group  <!-- Necesario para efectos hover -->"
      @click="navegateToBack"
    >
      <!-- Texto con gradiente -->
      <span
        class=" text-transparent bg-clip-text bg-gradient-to-r from-primario to-secundario  <!-- Gradiente en el texto --> group-hover:from-secundario group-hover:to-primario  <!-- Efecto hover (invierte colores) -->"
      >
        &#60; Back
      </span>
    </button>
    <v-card>
      <v-card-title class="flex flex-col pl-0" style="justify-content: flex-start !important; align-items: flex-start !important;">
        <div class="flex justify-start mb-9 p-8">
          <h1 class="text-left ml-0">
            Create Tax Definition
          </h1>
        </div>

        <div class="w-full p-8" style="justify-content: center !important; align-items: center !important;">
          <form action="POST" @submit.prevent="submitForm">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex flex-col mb-8">
                <label for="taxtype" class="text-left block text-sm font-medium text-gray-700">Tax type</label>
                <input
                  id="taxtype"
                  v-model="dataInput.taxType"
                  type="text"
                  name="taxtype"
                  placeholder="Enter tax name"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .Basic Salary-->

              <div class="flex flex-col mb-8">
                <label for="valueporcentage" class="text-left block text-sm font-medium text-gray-700">% value</label>
                <input
                  id="valueporcentage"
                  v-model="dataInput.valuePorcentage"
                  type="number"
                  min="0"
                  max="99"
                  name="valueporcentage"
                  placeholder="Enter amount in Naira"
                  class="w-full p-2 border border-gray-300 rounded-md border-solid"
                  required
                >
              </div> <!-- .valueporcentage-->
            </div> <!-- .grid primera fila-->

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div class="flex justify-center items-center sm:items-end">
                <input
                  type="button"
                  value="Create"
                  class="w-full h-11 py-3 text-xs bg-gradient-to-r from-primario to-secundario rounded-lg
                     hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out cursor-pointer"
                  style="color: white !important"
                  @click="navegateToCreate"
                >
              </div>
            </div> <!-- .grid tercera fila-->
          </form>
        </div>
      </v-card-title>
    </v-card>
    <p class="text-sm text-center mt-24">
      Copyright © {{ CurrenYear }} Relia Energy. All Rights Reserved
    </p>
  </div>
</template>

<script>
export default {
  name: 'PayrollCreateTax',
  data () {
    return {
      dataInput: {
        taxType: '',
        valuePorcentage: ''
      },
      CurrenYear: new Date().getFullYear()
    }
  },
  methods: {
    navegateToBack () {
      this.$router.push({ path: '/payroll' })
    },
    navegateToCreate () {
      console.log('Dsde Backend')
    }
  }
}
</script>
