<template>
  <v-app>
    <template v-if="appLoading">
      <v-overlay :value="true">
        <v-progress-circular
          indeterminate
          color="pink"
          size="72"
        ></v-progress-circular>
      </v-overlay>
    </template>
    <template v-else>
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
    </template>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import Footer from './components/Footer.vue'
import AuthService from './api/AuthService.js'

export default {
  components: {
    AppBar,
    Footer
  },

  data: () => ({
    appLoading: true
  }),

  computed: {
    gSnackbar() {
      return this.$store.state.gSnackbar
    }
  },

  async created() {
    // check if there is basic auth header stored in localStorage
    const h = localStorage.getItem('basicAuthHeader')
    if (h !== null) {
      // find previously stored basic auth header
      // try to sign in with the header
      const res = await AuthService.get({
        'Authorization': h
      })
      if (res.auth) {
        // sign in successfully
        this.$store.commit('setLoginStatus', true)
        this.$store.commit('setBasicAuthHeader', h)
        this.$store.commit('setUserInfo', res.userInfo)
        this.$store.commit('setGlobalSnackbar', {
          on: true,
          color: 'pink lighten-2',
          timeout: 1500,
          text: `Welcome, ${res.userInfo.username}!`
        })
      } else {
        // failed to sign in
        localStorage.removeItem('basicAuthHeader')
      }
    }
    // finish loading
    this.appLoading = false
  }
}
</script>
