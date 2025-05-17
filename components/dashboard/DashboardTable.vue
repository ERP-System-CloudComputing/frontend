<template>
  <v-card>
    <v-card-title>Memo</v-card-title>
    <div style="height: 250px; overflow-y: auto;">
      <v-data-table :items="data.items" :headers="data.headers" dense hide-default-footer />
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      require: true
    }
  }
}
</script>
