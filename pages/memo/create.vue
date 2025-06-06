<template>
  <div>
    <div class="mb-4">
      <nuxt-link to="/memo" class="text-blue-500 font-semibold text-sm">
        <v-icon left color="#1976d2">
          mdi-chevron-left
        </v-icon>
        Back
      </nuxt-link>
    </div>

    <v-card flat rounded="lg">
      <v-card-title class="font-extrabold text-xl">Create Memo</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-row dense>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Memo title</label>
              <v-text-field
                v-model="newMemo.title"
                placeholder="Enter title"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Sent from</label>
              <v-text-field
                v-model="newMemo.sentFrom"
                placeholder="Enter sent from"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Sent To</label>
              <v-select
                v-model="newMemo.sentTo"
                :items="sentTo"
                outlined
                dense
                :rules="[rules.selectOne]"
                placeholder="Select option"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Action</label>
              <v-select
                v-model="newMemo.action"
                :items="actions"
                outlined
                dense
                :rules="[rules.selectOne]"
                placeholder="Select option"
              />
            </v-col>
            <v-col md="8"></v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Date</label>
              <v-text-field
                v-model="newMemo.date"
                type="date"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Add attachment?</label>
              <v-select
                v-model="newMemo.haveAttachment"
                :items="['Yes', 'No']"
                outlined
                dense
                :rules="[rules.selectOne]"
                placeholder="Select option"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Attachment Type</label>
              <v-select
                v-model="newMemo.typeAttachment"
                :items="['PDF', 'Image', 'Document']"
                outlined
                dense
                :rules="[rules.selectOne]"
                placeholder="Select option"
              />
            </v-col>
            <v-col cols="12" md="8">
              <label class="text-sm font-normal text-black">Memo body</label>
              <v-textarea
                v-model="newMemo.body"
                placeholder="Enter memo body"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>

          <div class="flex gap-5 flex-col md:flex-row">
            <v-btn
              color="primary"
              class="w-full md:max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                    hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
            >
              Attache Payment Voucher
            </v-btn>
            <!-- Boton con el texto azul, bg blanco y borde azul y redondeado -->
            <button
              class="h-9 p-px bg-gradient-to-r from-primario to-secundario rounded-lg hover:opacity-90 duration-500 transform hover:scale-110 ease-in-out hover:shadow-lg"
            >
              <div class="bg-white rounded-lg h-full w-full flex items-center justify-center text-blue-500 px-9 py-3">
                Save
              </div>
            </button>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import Swal from 'sweetalert2'

export default {
  layout: 'principal',
  data () {
    return {
      isFormValid: false,
      sentTo: [
        'HR Staff',
        'Finance Staff',
        'Logistics Staff',
        'Procurement Staff',
        'Maintenance Staff',
        'All Staff'
      ],
      actions: [
        'Approve',
        'Reject',
        'Review',
        'Forward',
        'Archive'
      ],
      rules: {
        required: value => !!value || 'El campo es obligatorio',
        positiveAmount: value => (value > 0) || 'El monto debe ser positivo'
        // selectOne: value => (value.length > 0) || 'Debe seleccionar al menos una opción'
      },
      newMemo: {
        title: '',
        sentFrom: '',
        sentTo: '',
        action: '',
        date: '',
        haveAttachment: 'No',
        attachment: '',
        typeAttachment: '',
        body: ''
      }
    }
  },
  methods: {
  }
}
</script>
