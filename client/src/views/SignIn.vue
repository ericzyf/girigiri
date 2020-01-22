<template>
  <v-container
    fluid
    style="height:100%"
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
