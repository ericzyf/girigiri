<template>
  <v-app>
    <AppBar></AppBar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
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
