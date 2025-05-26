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
      <v-col cols="12" md="3" class="align-center justify-center">
        <div class="rounded-lg border border-gray-300 mx-3 justify-items-center ">
          <v-avatar
            size="160"
            class="flex-col items-center mt-28 justify-center"
            style="cursor: pointer; background-color: #e5e7eb;"
          >
            <v-img
              v-if="uploadedPhoto"
              :src="uploadedPhoto"
              cover
            />
            <v-icon
              v-else
              size="40"
              class="block -mb-4 leading-none m-0"
              color="grey"
            >
              mdi-camera-plus
            </v-icon>
            <p class=" mb-12 text-gray-500">
              Upload photo
            </p>
          </v-avatar>
          <input
            ref="fileInput"
            type="file"
            accept=".jpg,.jpeg,.png"
            style="display: none"
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
      <v-col cols="12" md="9">
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
                :rules="[required('First name',8)]"
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
                :rules="[required('First name',8)]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <span>Email address</span>
              <v-text-field
                v-model="formData.email"
                placeholder="Enter email address"
                class="rounded-lg"
                type="email"
                outlined
                dense
                :rules="[requiredEmail()]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <span>Phone number</span>
              <v-text-field
                v-model="formData.phone"
                placeholder="Enter phone number"
                class="rounded-lg"
                type="tel"
                maxlength="10"
                outlined
                dense
                :rules="[requiredNumber('Phone number')]"
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
                v-model="formData.alternatePhone"
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
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <span>Staff ID</span>
              <v-text-field
                v-model="formData.staffId"
                placeholder="Staff ID"
                class="rounded-lg"
                outlined
                dense
                required
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
                required
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" md="3">
        <v-row>
          <v-col class="justify-items-center text-white">
            <div class="px-3 w-full">
              <button
                type="submit"
                color="primary"
                class="py-4 w-full rounded-lg bg-gradient-to-br from-primario to-secundario"
                @click="createStaff()"
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
export default {
  data () {
    return {
      uploadedPhoto: null,
      genderOptions: [
        'Female',
        'Male',
        'Other'
      ],
      roleOptions: [
        'Admin',
        'I.T',
        'P.M',
        'R.H',
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
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        alternatePhone: '',
        role: '',
        designation: '',
        staffId: '',
        officialEmail: ''
      }
    }
  },
  methods: {
    staffAll () {
      this.$router.push('/staff')
    },
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
    createStaff () {
      if (this.$refs.form.validate()) {
        alert('Formulario válido')
        const newStaff = this.formData
        console.log(newStaff)
      } else {
        alert('Por favor completa todos los campos')
      }
    }
  }
}
</script>
<style scoped>
</style>
