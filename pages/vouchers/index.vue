<template>
  <v-container fluid class="px-3 pt-3">
    <v-row class=" rounded-lg bg-white pt-4">
      <v-col cols="12" sm="3">
        <div class=" justify-start lg:pl-12 ">
          <span class="font-extrabold text-3xl ">
            {{ vouchers.length }}
          </span>
          <span class="flex">
            Total number of staff
          </span>
        </div>
      </v-col>
      <v-col cols="12" sm="3" class="sm:pr-10">
        <span>
          Filter payment voucher
        </span>
        <v-select
          placeholder="Select Option"
          solo
          flat
          hide-details
          height="58"
          background-color="#F2F7FF"
          :items="filterVouchers"
          @input="fVoucher"
        />
      </v-col>
      <v-col cols="12" sm="3" align-self="center" align="center">
        <div class="w-full">
          <button class=" text-white w-full sm:w-auto sm:mt-4 flex justify-center rounded-lg bg-gradient-to-br from-primario to-secundario hover:from-blue-600 shadow-md p-4" @click="staffAdd">
            Create Payment Voucher
          </button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      filterVouchers: [
        'All memos'
      ],
      fVoucher: '',
      vouchers: []
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.vouchers.length / this.itemsPerPage)
    }
  }
}
</script>

<style scoped>
</style>
