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
      <v-card-title>
        <h3 class="text-xl font-semibold">
          Add New Item
        </h3>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-row dense>
            <v-col cols="12" md="4" class="pr-7">
              <div class="w-full max-w-xs flex flex-col items-center border pt-16 pb-12">
                <div
                  class="w-48 h-48 bg-gray-100 rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300 hover:border-gray-400"
                  @click="triggerFileInput"
                  @dragover.prevent
                  @drop.prevent="handleFileDrop"
                >
                  <div v-if="!newItem.image" class="text-center">
                    <v-icon
                      class="text-gray-500 mb-2"
                      size="48"
                    >
                      mdi-camera
                    </v-icon>
                    <p class="text-gray-600 font-medium">
                      Upload photo
                    </p>
                  </div>
                  <div v-else class="w-full h-full rounded-full overflow-hidden">
                    <img :src="newItem.image" alt="Selected product" class="w-full h-full object-cover" />
                  </div>
                </div>

                <!-- File Input (Hidden) -->
                <input
                  ref="fileInput"
                  class="hidden"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  @change="handleFileSelect"
                />

                <!-- Upload Info -->
                <div class="mt-4 text-center text-sm text-gray-500">
                  <p class="font-medium" style="margin-bottom: 0 !important;">
                    Allowed format
                  </p>
                  <p class="text-black">
                    JPG, JPEG, and PNG
                  </p>
                  <p class="mt-2 font-medium" style="margin-bottom: 0 !important;">Max file size</p>
                  <p class="text-black">2MB</p>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" md="6">
                  <label class="text-sm font-normal text-black">Product name</label>
                  <v-text-field
                    v-model="newItem.name"
                    placeholder="Enter product name"
                    outlined
                    dense
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <label class="text-sm font-normal text-black">Product ID</label>
                  <v-text-field
                    v-model="newItem.id"
                    placeholder="Enter ID"
                    outlined
                    dense
                    :rules="[rules.required]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <label class="text-sm font-normal text-black">Category</label>
                  <v-select
                    v-model="newItem.category"
                    :items="['Electronics', 'Furniture', 'Clothing']"
                    outlined
                    dense
                    placeholder="Select category"
                    :rules="[rules.selectOne]"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <label class="text-sm font-normal text-black">QTY purchased</label>
                  <v-text-field
                    v-model.number="newItem.quantity"
                    type="number"
                    placeholder="Enter quantity"
                    outlined
                    dense
                    :rules="[rules.required, rules.positiveAmount]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <label class="text-sm font-normal text-black">Unit price</label>
                  <v-text-field
                    v-model.number="newItem.unitPrice"
                    type="number"
                    placeholder="Enter unit price"
                    outlined
                    dense
                    :rules="[rules.required, rules.positiveAmount]"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <label class="text-sm font-normal text-black">Total cost</label>
                  <v-text-field
                    v-model.number="newItem.totalCost"
                    type="number"
                    placeholder="Enter total cost"
                    outlined
                    dense
                    :rules="[rules.required, rules.positiveAmount]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <label class="text-sm font-normal text-black">Supplier</label>
                  <v-text-field
                    v-model="newItem.supplier"
                    placeholder="Enter supplier name"
                    outlined
                    dense
                    :rules="[rules.required]"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-btn
            color="primary"
            class="w-full max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white mt-8"
          >
            Add Item
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
      rules: {
        required: value => !!value || 'El campo es obligatorio',
        positiveAmount: value => (value > 0) || 'El monto debe ser positivo',
        selectOne: value => (value.length > 0) || 'Debe seleccionar al menos una opción'
      },
      newItem: {
        name: '',
        id: '',
        category: '',
        quantity: 0,
        unitPrice: 0,
        totalCost: 0,
        supplier: '',
        image: ''
      }
    }
  },
  methods: {
    triggerFileInput () {
      this.$refs.fileInput.click()
    },
    handleFileDrop (event) {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      if (file) {
        this.processFile(file)
      }
    },
    handleFileSelect (event) {
      const file = event.target.files[0]
      if (file) {
        this.processFile(file)
      }
    },
    processFile (file) {
      const maxSize = 0.8 * 1024 * 1024 // 0.8MB

      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El archivo es demasiado grande. El tamaño máximo permitido es 0.8MB.'
        })
        return
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Formato de imagen no permitido. Solo se permiten JPG, JPEG y PNG.'
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        this.newItem.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
