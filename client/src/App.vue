<template>
  <v-app>
    <AppBar></AppBar>
    <v-snackbar
      bottom
      v-model="gSnackbar.on"
      :color="gSnackbar.color"
      :timeout="gSnackbar.timeout"
    >
      {{ gSnackbar.text }}
      <v-btn
        text color="pink"
        @click="gSnackbar.on = false"
      >
        CLOSE
      </v-btn>
    </v-snackbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    AppBar,
    Footer
  },
  data: () => ({
  }),
  computed: {
    gSnackbar() {
      return this.$store.state.gSnackbar
    }
  }
}
</script>
