<template>
  <div>
    <div class="mb-4">
      <nuxt-link to="/circulars" class="text-blue-500 font-semibold text-sm">
        <v-icon left color="#1976d2">
          mdi-chevron-left
        </v-icon>
        Back
      </nuxt-link>
    </div>

    <v-card flat rounded="lg">
      <v-card-title>Update Circular</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-row dense>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Circular title</label>
              <v-text-field v-model="updateCircular.title" placeholder="Enter title" outlined dense :rules="[rules.required]"/>
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Sent from</label>
              <v-select
                v-model="updateCircular.sentFrom"
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
                v-model="updateCircular.sentTo"
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
                v-model="updateCircular.date"
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
                v-model="updateCircular.message"
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
            @click="circularUpdate"
          >
            Update Circular
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
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
      updateCircular: {
        title: '',
        sentFrom: [],
        sentTo: '',
        date: '',
        message: ''
      },
      idCircular: this.$route.params.id,
      rules: {
        required: value => !!value || 'El campo es obligatorio',
        positiveAmount: value => (value > 0) || 'El monto debe ser positivo',
        selectOne: value => (value.length > 0) || 'Debe seleccionar al menos una opción'
      }
    }
  },
  methods: {
    async circularUpdate () {
      try {
        if (!this.$refs.form.validate()) {
          Swal.fire({
            icon: 'warning',
            title: 'Formulario incompleto',
            text: 'Por favor, complete todos los campos obligatorios.'
          })
          return
        }

        this.updateCircular.sentFrom = this.updateCircular.sentFrom.join(', ')
        const response = await this.$axios.put(`/circular/update/${this.idCircular}`, this.updateCircular)

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Circular actualizado',
            text: 'El circular se ha actualizado correctamente.'
          })
          this.$router.push('/circulars')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el circular',
            text: 'No se pudo actualizar el circular. Por favor, intente nuevamente.'
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el circular',
          text: error.message || 'Ocurrio un error al actualizar el circular.'
        })
      }
    },
    async fetchCircular () {
      try {
        const response = await this.$axios.get(`/circular/${this.idCircular}`)
        const { data } = response

        if (data) {
          this.updateCircular = {
            title: data.title,
            sentFrom: data.sentFrom.split(', '), // Assuming sentFrom is a comma-separated string
            sentTo: data.sentTo,
            date: new Date(data.date).toISOString().split('T')[0], // Format date to YYYY-MM-DD
            message: data.message
          }
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Circular no encontrado',
            text: 'No se encontró el circular con el ID proporcionado.'
          })
        }
      } catch (error) {
        console.error('Error fetching circular:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar el circular',
          text: error.message || 'Ocurrio un error al obtener el circular.'
        })
      }
    }
  },
  mounted () {
    if (this.idCircular) {
      console.log(`Fetching circular with ID: ${this.idCircular}`)
      this.fetchCircular()
    }
  }
}
</script>
