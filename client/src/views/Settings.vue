<template>
  <v-container fluid>
    <p>{{ userInfo }}</p>
  </v-container>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return JSON.stringify(this.$store.state.userInfo)
    }
  }
}
</script>
