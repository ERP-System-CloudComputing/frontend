<template>
  <v-app-bar app flat color="transparent" class="py-6">
    <div class="flex flex-col">
      <h1 class="font-extrabold text-xl">Welcome, Mr. Otor John</h1>
      <span class="font-normal text-sm mt-1">Today is Saturday, 11th November 2022.</span>
    </div>

    <v-spacer />

    <div class="flex contenedor-texto">
      <button class="mr-3">
        <v-icon color="black">mdi-bell</v-icon>
      </button>

      <div class="flex justify-center items-center">
        <v-avatar size="32" class="mr-4">
          <img src="https://i.pravatar.cc/300" alt="Avatar" />
        </v-avatar>
        <div class="flex-none flex flex-col items-start mr-4">
          <span class="inline-block text-sm">Otor John</span>
          <span class="inline-block text-xs text-gray-500">HR Office</span>
        </div>
        <button class="hover:bg-gray-300 p-1 transition rounded-sm">
          <v-icon color="black">mdi-chevron-down</v-icon>
        </button>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
</script>

<style scoped>
.contenedor-texto {
  flex: none !important;
}
</style>
