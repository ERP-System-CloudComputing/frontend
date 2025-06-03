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
        <v-form ref="form" v-model="isFormValid">
          <v-row dense>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Circular title</label>
              <v-text-field v-model="newCircular.title" placeholder="Enter title" outlined dense :rules="[rules.required]"/>
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Sent from</label>
              <v-select
                v-model="newCircular.sentFrom"
                :items="departments"
                placeholder="Sent from"
                outlined
                chips
                clearable
                multiple
                dense
                :rules="[rules.selectOne]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Sent to</label>
              <v-select
                v-model="newCircular.sentTo"
                :items="sentTo"
                placeholder="Sent to"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Date</label>
              <v-text-field
                v-model="newCircular.date"
                label="Date"
                outlined
                dense
                type="date"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="8">
              <label class="text-sm font-normal text-black">Circular message</label>
              <v-textarea
                v-model="newCircular.message"
                outlined
                placeholder="Enter message..."
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>

          <v-btn
            color="primary"
            class="w-full max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
            @click="createCircular"
          >
            Send Circular
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </divh>
</template>

<script>
import Swal from 'sweetalert2'

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
      departments: ['Admin', 'HR', 'IT', 'Finance', 'Management'],
      newCircular: {
        title: '',
        sentFrom: [],
        sentTo: '',
        date: '',
        message: ''
      },
      rules: {
        required: value => !!value || 'El campo es obligatorio',
        positiveAmount: value => (value > 0) || 'El monto debe ser positivo',
        selectOne: value => (value.length > 0) || 'Debe seleccionar al menos una opción'
      }
    }
  },
  methods: {
    async createCircular () {
      try {
        if (!this.$refs.form.validate()) {
          console.error('Form validation failed')
          return
        }

        this.newCircular.sentFrom = this.newCircular.sentFrom.join(', ')

        const result = await this.$axios.post('/circular/create', this.newCircular)

        if (result.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Circular creado con éxito',
            text: 'El circular ha sido creado exitosamente.',
            confirmButtonText: 'OK'
          })
          this.$router.push('/circulars')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ups! Ha ocurrido un error',
            text: result.data.message || 'No se pudo crear el circular. Por favor, inténtelo de nuevo más tarde.',
            confirmButtonText: 'OK'
          })
        }
      } catch (error) {
        console.error('Error al crear el circular:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al crear el circular. Por favor, inténtelo de nuevo más tarde.',
          confirmButtonText: 'OK'
        })
      }
    }
  }
}
</script>
