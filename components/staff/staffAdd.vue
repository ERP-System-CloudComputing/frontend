<template>
  <v-container fluid class="px-7 pt-10">
    <button class="flex" @click="staffAll">
      <v-icon>
        mdi-arrow-left
      </v-icon>
      <span class="text-lg">Back</span>
    </button>
    <v-row>
      <v-col>
        template
      </v-col>
      <v-col>
        first name
      </v-col>
      <v-col>
        last name
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    staffAll () {
      this.$router.push('/staff')
    }
  }
}
</script>
<style scoped>
</style>
