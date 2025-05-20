<template>
  <divh>
    <div class="mb-4">
      <nuxt-link to="/circulars" class="text-blue-500 font-semibold text-sm">
        <v-icon left color="#1976d2">
          mdi-chevron-left
        </v-icon>
        Back
      </nuxt-link>
    </div>

    <v-card flat rounded="lg">
      <v-card-title>Create Circular</v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4">
            <label class="text-sm font-normal text-black">Circular title</label>
            <v-text-field v-model="newCircular.title" placeholder="Enter title" outlined dense />
          </v-col>
          <v-col cols="12" md="4">
            <label class="text-sm font-normal text-black">Sent from</label>
            <v-text-field v-model="newCircular.from" placeholder="Sent From" outlined dense />
          </v-col>
          <v-col cols="12" md="4">
            <label class="text-sm font-normal text-black">Sent to</label>
            <v-select
              v-model="newCircular.to"
              :items="sentTo"
              placeholder="Sent to"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" md="4">
            <label class="text-sm font-normal text-black">Date</label>
            <v-text-field v-model="newCircular.date" label="Date" outlined dense type="date" />
          </v-col>
          <v-col cols="12" md="8">
            <label class="text-sm font-normal text-black">Circular message</label>
            <v-textarea v-model="newCircular.message" outlined placeholder="Enter message..." />
          </v-col>
        </v-row>

        <v-btn
          color="primary"
          class="w-full max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
              hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
        >
          Send Circular
        </v-btn>
      </v-card-text>
    </v-card>
  </divh>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      sentTo: [
        'HR Office',
        'Finance Office',
        'Logistics Office',
        'Procurement Office',
        'Maintenance Office'
      ],
      newCircular: {
        title: '',
        from: '',
        to: '',
        date: '',
        message: ''
      }
    }
  }
}
</script>
