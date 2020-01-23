<template>
  <v-container
    fluid
    style="height:100%"
    class="gradient-bg"
  >
    <v-row
      style="height:100%"
    >
      <v-card
        class="ma-auto"
        width="450"
        height="500"
        outlined
      >
        <Logo
          class="pink--text text--lighten-2"
        ></Logo>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '../components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.gradient-bg {
  background: rgb(238,174,202);
  background: linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
}
</style>
