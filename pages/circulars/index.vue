<template>
  <div>
    !-- Encabezado: Filtros y acciones -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex gap-4">
        <v-text-field
          v-model="search"
          label="Enter search word"
          outlined
          dense
        />
        <v-select
          v-model="selectedFilter"
          :items="filters"
          label="All memos"
          outlined
          dense
        />
      </div>
      <div class="text-center">
        <div class="text-lg font-bold">250</div>
        <div class="text-sm text-gray-500">Total circulars</div>
      </div>
      <nuxt-link
        to="/budget/create"
        class="px-16 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
              hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
      >
        Create Circular
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      filters: ['All memos', 'Sent', 'Received']
    }
  }
}
</script>
