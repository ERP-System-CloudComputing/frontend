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
        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field v-model="budget.budgetNo" label="Budget number" outlined dense />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="budget.description" label="Budget description" outlined dense />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="budget.amount" label="Budget amount" outlined dense prefix="$" />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="budget.date" label="Date" outlined dense type="date" />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="budget.office"
              :items="offices"
              label="Receiving office"
              outlined
              dense
            />
          </v-col>
        </v-row>

        <v-btn
          color="primary"
          class="w-full max-w-xs px-8 py-3 bg-gradient-to-r from-primario to-secundario text-white rounded-lg
              hover:opacity-90 duration-500 transform hover:scale-105 ease-in-out color-white"
        >
          Create Budget
        </v-btn>
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
      budget: {
        budgetNo: '',
        description: '',
        amount: '',
        date: '',
        office: ''
      },
      offices: ['Head Office', 'Regional Office', 'Branch Office'],
      budgetList: [],
      headers: [
        { text: 'S/N', value: 'sn', sortable: false },
        { text: 'Budget No.', value: 'budgetNo' },
        { text: 'Budget Description', value: 'description' },
        { text: 'Budget Amount (MXN)', value: 'amount' },
        { text: 'Date', value: 'date' }
      ]
    }
  }
}
</script>
