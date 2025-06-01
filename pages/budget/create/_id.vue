<template>
  <div>
    <div class="mb-4">
      <nuxt-link to="/budget" class="text-blue-500 font-semibold text-sm">
        <v-icon left color="#1976d2">
          mdi-chevron-left
        </v-icon>
        Back
      </nuxt-link>
    </div>

    <v-card flat rounded="lg">
      <v-card-title>Create Budget</v-card-title>
      <v-card-subtitle>Kindly fill in the form below to create a budget</v-card-subtitle>

      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-row dense>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Budget number</label>
              <v-text-field v-model="budget.number" placeholder="Enter item" outlined dense :rules="[rules.required, rules.positiveAmount]" />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Budget description</label>
              <v-text-field v-model="budget.description" placeholder="Enter description" outlined dense :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Budget amount</label>
              <v-text-field
                v-model="budget.amount"
                placeholder="Enter amount in $"
                outlined
                dense
                prefix="$"
                :rules="[rules.required, rules.positiveAmount]"
                @blur="formatAmount"
              />
            </v-col>

            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Date</label>
              <v-text-field
                v-model="budget.requestDate"
                placeholder="DD/MM/YYYY"
                outlined
                dense
                type="date"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <label class="text-sm font-normal text-black">Receiving office</label>
              <v-select
                v-model="budget.receivingOffice"
                :items="offices"
                placeholder="Select office"
                outlined
                dense
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>

          <v-btn
            color="primary"
            class="w-full max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
                hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
            @click="createBudget"
          >
            Create Budget
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card class="mt-6" flat rounded="lg">
      <v-card-title>Budget Request</v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="budgetList"
          dense
          hide-default-footer
          class="elevation-0"
          show-select
          v-model="selectedBudgets"
        >
          <template #[`item.amount`]="{ item }">
            ${{ item.amount.toLocaleString('en-US', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </template>
        </v-data-table>

        <v-btn
          color="primary"
          class="mt-6 px-8 py-3 text-white font-medium"
          :disabled="selectedBudgets.length === 0"
          @click="submitForApproval"
        >
          Submit for Approval
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { random } from 'xe-utils'

export default {
  layout: 'principal',
  data () {
    return {
      isFormValid: false,
      budget: {
        number: `${random(10000000, 99999999)}`, // Genera un número aleatorio de 8 dígitos
        description: '',
        amount: '',
        requestDate: '',
        receivingOffice: '',
        annualBudgetId: this.$route.params.id || '' // Obtiene el ID del presupuesto anual de la ruta
      },
      offices: ['Head Office', 'Regional Office', 'Branch Office'],
      budgetList: [],
      selectedBudgets: [],
      headers: [
        { text: 'S/N', value: 'sn', sortable: false },
        { text: 'Budget No.', value: 'number' },
        { text: 'Budget Description', value: 'description' },
        { text: 'Budget Amount (MXN)', value: 'amount' },
        { text: 'Date', value: 'date' }
      ],
      rules: { // Define tus reglas de validación
        required: value => !!value || 'Este campo es obligatorio.',
        positiveAmount: value => (value && parseFloat(value) > 0) || 'Debe contener números positivos.'
      }
    }
  },
  mounted () {
    this.fetchBudgetPending()
  },
  methods: {
    async fetchBudgetPending () {
      try {
        const response = await this.$axios.get('/budget/getAllPending')
        if (response.status === 200) {
          this.budgetList = response.data.map((item, index) => ({
            ...item,
            sn: index + 1,
            date: new Date(item.requestDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })
          }))
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudieron cargar los presupuestos pendientes. Por favor, inténtelo de nuevo más tarde.',
            icon: 'error'
          })
        }
      } catch (error) {
        console.error('Error al obtener presupuestos pendientes:', error)
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al cargar los presupuestos pendientes. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error'
        })
      }
    },
    formatAmount () {
      const value = this.budget.amount.toString().replace(/,/g, '') // quitar comas si las hay
      const number = parseFloat(value)

      if (!isNaN(number)) {
        // Si hay mas de 3 dígitos, formatea con comas
        this.budget.amount = number.toLocaleString('en-US', {
          style: 'currency',
          currency: 'MXN',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).replace('MX$', '') // Elimina el símbolo de moneda para que no se envíe al servidor
      } else {
        this.budget.amount = ''
      }
    },
    async createBudget () {
      try {
        if (!this.$refs.form.validate()) {
          console.warn('Formulario inválido')
          return
        }

        const resultado = await this.$axios.post('/budget/create', this.budget)
        if (resultado.status === 201) {
          Swal.fire({
            title: 'Presupuesto creado con éxito',
            text: 'El presupuesto ha sido creado correctamente.',
            icon: 'success'
          })

          this.fetchBudgetPending() // Actualiza la lista de presupuestos pendientes
        } else {
          Swal.fire({
            title: 'Ha ocurrido un error',
            text: 'No se pudo crear el presupuesto. Por favor, inténtelo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push('/budget')
            }
          })
        }
      } catch (error) {
        console.error('Error al crear el presupuesto:', error)
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al crear el presupuesto. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error'
        })
      }
    },
    async submitForApproval () {
      if (this.selectedBudgets.length === 0) {
        Swal.fire({
          title: 'No se han seleccionado presupuestos',
          text: 'Por favor, seleccione al menos un presupuesto para enviar.',
          icon: 'warning'
        })
        return
      }

      const selectedBudgetIds = this.selectedBudgets.map(budget => budget.id)

      try {
        const response = await this.$axios.post('/budget/submitForApproval', {
          budgetIds: selectedBudgetIds
        })

        if (response.status === 200) {
          Swal.fire({
            title: 'Presupuestos Aprobados',
            text: 'Los presupuestos seleccionados han sido aprobados.',
            icon: 'success'
          })

          this.fetchBudgetPending() // Actualiza la lista de presupuestos pendientes
          this.selectedBudgets = [] // Limpia la selección
        } else {
          Swal.fire({
            title: 'Error al aprobar presupuestos',
            text: 'No se pudieron enviar los presupuestos para aprobación. Por favor, inténtelo de nuevo más tarde.',
            icon: 'error'
          })
        }
      } catch (error) {
        console.error('Error al enviar presupuestos para aprobación:', error)
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al enviar los presupuestos para aprobación. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error'
        })
      }
    }
  }
}
</script>
