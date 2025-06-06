<template>
  <v-container fluid>
    <v-row>
      <button class="flex pb-4" @click="staffAll">
        <v-icon class="bg-gradient-to-b from-primario to-secundario bg-clip-text text-transparent">
          mdi-arrow-left
        </v-icon>
        <span class="text-lg bg-gradient-to-r from-primario to-secundario bg-clip-text text-transparent">Back</span>
      </button>
    </v-row>

    <v-row class="bg-white rounded-t-lg">
      <v-col class="flex w-100">
        <span class="font-bold text-lg">
          Add a New Staff
        </span>
      </v-col>
    </v-row>

    <v-row class="bg-white rounded-b-lg">
      <v-col cols="12" md="4" class="align-center justify-center">
        <div class="rounded-lg border border-gray-300 mx-3 justify-items-center ">
          <v-avatar
            size="160"
            class="flex-col items-center mt-28 justify-center"
            style="cursor: pointer; background-color: #e5e7eb;"
            @click="FileInput"
          >
            <v-img
              v-if="formData.photo"
              :src="formData.photo"
              cover
            />
            <div v-else class="justify-items-center">
              <v-icon
                size="40"
                class="block mb-4 leading-none m-0"
                color="grey"
              >
                mdi-camera-plus
              </v-icon>
              <p class=" mb-3  text-gray-500">
                Upload photo
              </p>
            </div>
          </v-avatar>
          <input
            ref="fileInput"
            type="file"
            accept=".jpg,.jpeg,.png"
            style="display: none"
            @change="handleFileUpload"
          >

          <div class="mt-8 text-center mb-24">
            <p class="text-gray-400">
              Allowed format
            </p>
            <p class=" mb-3">
              JPG, JPEG, and PNG
            </p>
            <p class="text-gray-400 text-sm mb-1">
              Max file size
            </p>
            <p class="text-lg">
              2MB
            </p>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <v-form ref="form" v-model="formValidar">
          <v-row>
            <v-col cols="12" sm="6">
              <span>First name</span>
              <v-text-field
                v-model="formData.firstName"
                placeholder="Enter first name"
                class="rounded-lg"
                outlined
                dense
                :rules="[required('First name')]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <span>Last name</span>
              <v-text-field
                v-model="formData.lastName"
                placeholder="Enter last name"
                class="rounded-lg"
                outlined
                dense
                :rules="[required('First name')]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <span>Email address</span>
              <v-text-field
                v-model="formData.personalEmail"
                placeholder="Enter email address"
                class="rounded-lg"
                outlined
                dense
                :rules="[requiredEmail()]"
                @change="generateValues()"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <span>Phone number</span>
              <v-text-field
                v-model="formData.phoneNumber"
                placeholder="Enter phone number"
                class="rounded-lg"
                type="tel"
                maxlength="10"
                outlined
                dense
                :rules="[requiredNumber('Phone number')]"
                @change="generateValues()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <span>Gender</span>
              <v-select
                v-model="formData.gender"
                :items="genderOptions"
                placeholder="Select gender"
                class="rounded-lg"
                outlined
                dense
                :rules="[required('Gender')]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <span>House number </span>
              <v-text-field
                v-model="formData.houseNumber"
                placeholder="Enter house number"
                class="rounded-lg"
                type="tel"
                outlined
                dense
                maxlength="10"
                :rules="[requiredNumber('House number')]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <span>Role</span>
              <v-select
                v-model="formData.role"
                :items="roleOptions"
                placeholder="Select role"
                class="rounded-lg"
                outlined
                dense
                :rules="[required('Role')]"
                @change="generateValues()"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <span>Designation</span>
              <v-select
                v-model="formData.designation"
                :items="designationOptions"
                placeholder="Select designation"
                class="rounded-lg"
                outlined
                dense
                :rules="[required('Designation')]"
                @change="generateValues()"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <span>Staff ID</span>
              <v-text-field
                v-model="formData.staffID"
                placeholder="Staff ID"
                class="rounded-lg"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="12" sm="6">
              <span>Official email</span>
              <v-text-field
                v-model="formData.officialEmail"
                placeholder="Official Email"
                class="rounded-lg"
                type="email"
                outlined
                dense
                disabled
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col class="justify-items-center text-white">
            <div class="px-3 w-full">
              <button
                type="submit"
                color="primary"
                class="py-4 w-full rounded-lg bg-gradient-to-br from-primario to-secundario"
                @click="validForm()"
              >
                Add Staff
              </button>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      formValidar: false,
      genderOptions: [
        'Female',
        'Male',
        'Other'
      ],
      roleOptions: [
        'Admin',
        'I.T',
        'P.M',
        'None'
      ],
      designationOptions: [
        'Human Resources',
        'Operations',
        'Project Management',
        'Customer Service',
        'Cleaning',
        'Security'
      ],
      convertedOptions: {
        Admin: 'A',
        'I.T': 'IT',
        'P.M': 'PM',
        None: '',
        'Human Resources': 'HR',
        Operations: 'O',
        'Project Management': 'PM',
        'Customer Service': 'CS',
        Cleaning: 'C',
        Security: 'S'
      },
      formData: {
        firstName: '',
        lastName: '',
        personalEmail: '',
        phoneNumber: '',
        gender: '',
        houseNumber: '',
        role: '',
        designation: '',
        staffID: '',
        officialEmail: '',
        password: '',
        photo: null
      }
    }
  },
  methods: {
    staffAll () {
      this.$router.push('/staff')
    },
    FileInput () {
      this.$refs.fileInput.click()
    },
    handleFileUpload (event) {
      const file = event.target.files[0]
      if (file) {
        // -Validar tamaño del archivo de 2MB
        if (file.size > 0.8 * 1024 * 1024) {
          return alert('File size must be less than 0.8MB', 'error')
        }
        // -Tipo de archivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
        if (!allowedTypes.includes(file.type)) {
          return alert('Only JPG, JPEG, and PNG files are allowed', 'error')
        }
        // -Mostrar la imagen en el circulo de v-avatar
        const reader = new FileReader()
        reader.onload = (e) => { // -Almacena el photo
          this.formData.photo = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    // Validaciones de campos
    required (campo, min) {
      return (v) => {
        if (!v) { return `${campo} is Required` }
        if (v.length < min) { return `${campo} must be at least ${min} characters` }
        return true
      }
    },
    requiredEmail () {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return v => regex.test(v) || 'Invalid email'
    },
    requiredNumber (campo) {
      return (v) => {
        if (!v) { return `${campo} is required` }
        if (!/^\d+$/.test(v)) { return `${campo} name must only contain numbers` }
        if (v.length !== 10) { return `${campo} must be 10 digits` }
        return true
      }
    },
    generateValues () {
      // Generando staffID y correo oficial
      const phoneConv = this.formData.phoneNumber.length >= 7 ? this.formData.phoneNumber.slice(3, 7) : '0000'
      const rol = this.convertedOptions[this.formData.role] || ''
      const designation = this.convertedOptions?.[this.formData.designation] || ''
      const email = this.formData.personalEmail.split('@')[0]
      this.formData.officialEmail = `${email}${designation.toLowerCase()}@erp.com`
      this.formData.staffID = `${phoneConv}${rol}${designation}`
    },
    // Backend
    validForm () {
      if (this.$refs.form.validate()) {
        this.createStaff()
      } else {
        alert('Complete all fields')
      }
    },
    async createStaff () {
      try {
        // console.log(this.formData)
        const response = await this.$axios.post('/staff/create', this.formData)
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Staff Created'
          })
        }
        this.$router.push('/staff')
      } catch (error) {
        // console.log(error)
        const errorMessage = error.message || 'Error Staff'
        this.$store.dispatch('alert/triggerAlert', {
          message: errorMessage,
          type: 'error'
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
