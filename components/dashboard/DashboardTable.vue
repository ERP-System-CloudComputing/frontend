<template>
  <v-card>
    <v-card-title>{{ data.title }}</v-card-title>
    <div style="height: 250px; overflow-y: auto;">
      <v-data-table :items="data.items" :headers="data.headers" dense hide-default-footer>
        <template #[`item.status`]="{ item }">
          <v-chip :color="getStatusColor(item.status)" dark small>
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
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
  },
  methods: {
    getStatusColor (status) {
      if (status === 'APPROVED') {
        return 'green darken-1'
      } else if (status === 'PENDING') {
        return 'orange darken-1'
      } else if (status === 'REJECTED') {
        return 'red darken-1'
      } else {
        return 'grey'
      }
    }
  }
}
</script>
