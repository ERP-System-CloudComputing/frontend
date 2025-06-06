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
      <v-card-title class="font-extrabold text-xl">
        Create Memo
      </v-card-title>

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
            <v-col md="8" />
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
                placeholder="Select option"
                :disabled="newMemo.haveAttachment === 'No'"
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
            <input
              id="file-input"
              type="file"
              style="display: none"
              @change="e => handleFileUpload(e)"
            />
            <v-btn
              color="primary"
              class="w-full md:max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                    hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
              :disabled="newMemo.haveAttachment === 'No' || newMemo.attachment !== ''"
              @click="triggerFileInput()"
            >
              Attache Payment Voucher
            </v-btn>
            <!-- Boton con el texto azul, bg blanco y borde azul y redondeado -->
            <button
              class="h-9 p-px bg-gradient-to-r from-primario to-secundario rounded-lg hover:opacity-90 duration-500 transform hover:scale-110 ease-in-out hover:shadow-lg"
              @click.prevent="saveMemo"
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
      actions: [
        'APPROVED',
        'REJECTED',
        'REVIEW',
        'FORWARD',
        'ARCHIVED'
      ],
      rules: {
        required: value => !!value || 'El campo es obligatorio',
        positiveAmount: value => (value > 0) || 'El monto debe ser positivo',
        selectOne: value => (value.length > 0) || 'Debe seleccionar al menos una opción'
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
    saveMemo () {
      if (this.$refs.form.validate()) {
        if (this.newMemo.haveAttachment === 'Yes') {
          if (!this.newMemo.typeAttachment) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor, seleccione el tipo de adjunto.'
            })
            return
          }
          if (!this.newMemo.attachment) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor, adjunte un archivo.'
            })
            return
          }
        }

        try {
          console.log('Datos del nuevo memo:', this.newMemo)
        } catch (error) {
          console.error('Error al crear el memo:', error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el memo. Por favor, inténtelo de nuevo más tarde.'
          })
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, completa todos los campos obligatorios.'
        })
      }
    },
    triggerFileInput () {
      document.getElementById('file-input').click()
    },
    async handleFileUpload (event) {
      const file = event.target.files[0]
      if (file) {
        if (file.type !== 'application/pdf') {
          console.warn('Solo se permiten archivos PDF')
          return
        }

        if (file.size > 5 * 1024 * 1024) { // 5 MB
          console.warn('El archivo es demasiado grande. El tamaño máximo permitido es de 5 MB.')
          return
        }

        // Aquí puedes manejar la subida del archivo, por ejemplo, enviarlo a un servidor
        const formData = new FormData()
        formData.append('file', file)

        try {
          const response = await this.$axios.post('/files/upload-pdf', formData)

          if (response.status === 200) {
            this.newMemo.attachment = response.data
            Swal.fire('Éxito', 'Archivo subido correctamente.', 'success')
          } else {
            console.warn('Error al subir el archivo:', response.data)
            Swal.fire('Error', 'No se pudo subir el archivo. Por favor, inténtelo de nuevo más tarde.', 'error')
          }
        } catch (error) {
          console.error('Error al subir el archivo:', error)
          Swal.fire('Error', 'No se pudo subir el archivo. Por favor, inténtelo de nuevo más tarde.', 'error')
        }
      } else {
        console.warn('No se seleccionó ningún archivo')
      }
    }
  }
}
</script>
