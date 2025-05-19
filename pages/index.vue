<template>
  <v-container>
    <login />
  </v-container>
</template>

<script>
import login from './auth/login.vue'

export default {
  name: 'IndexPage',
  components: {
    login
  }
}
</script>
