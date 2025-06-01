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
        >
          <template #[`item.amount`]="{ item }">
            $\{{ Number(item.amount).toLocaleString() }}
          </template>
        </v-data-table>

        <v-btn
          color="primary"
          class="mt-6 px-8 py-3 text-white font-medium"
          :disabled="budgetList.length === 0"
        >
          Submit for Approval
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      isFormValid: false,
      budget: {
        number: '',
        description: '',
        amount: '',
        requestDate: '',
        receivingOffice: ''
      },
      offices: ['Head Office', 'Regional Office', 'Branch Office'],
      budgetList: [],
      headers: [
        { text: 'S/N', value: 'sn', sortable: false },
        { text: 'Budget No.', value: 'budgetNo' },
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
  methods: {
    formatAmount () {
      const value = this.budget.amount.toString().replace(/,/g, '') // quitar comas si las hay
      const number = parseFloat(value)

      if (!isNaN(number)) {
        this.budget.amount = number.toFixed(2) // guarda con dos decimales
      } else {
        this.budget.amount = ''
      }
    },
    createBudget () {
      if (!this.$refs.form.validate()) {
        console.warn('Formulario inválido')
        return
      }

      console.log(this.budget)
    }
  }
}
</script>
