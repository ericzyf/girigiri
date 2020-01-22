<template>
  <v-app>
    <AppBar></AppBar>

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
  })
}
</script>
