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
        width="400"
        height="450"
        outlined
      >
        <v-list dense>
          <v-list-item class="mt-2">
            <v-list-item-content class="text-center">
              <Logo
                class="pink--text text--lighten-2 headline"
              ></Logo>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mx-auto" style="width:90%">
            <v-list-item-content>
              <v-text-field
                v-model="username"
                :prepend-icon="mdiAccount"
                label="Username"
                clearable
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mx-auto" style="width:90%">
            <v-list-item-content>
              <v-text-field
                v-model="password"
                label="Password"
                :prepend-icon="mdiKey"
                :append-icon="showPassword ? mdiEye : mdiEyeOff"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                counter
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mx-auto" style="width:90%">
            <v-list-item-content>
              <router-link
                to="/"
                style="text-decoration:none"
              >
                <span class="font-weight-light">
                  Forgot username/password?
                </span>
              </router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-checkbox
                v-model="rememberUser"
                label="Remember me"
                color="pink"
                class="ml-6"
              ></v-checkbox>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-container class="px-0 pt-2">
                <v-row>
                  <v-col class="py-0 pl-5">
                    <div class="ml-4 grey--text text--lighten-1 overline">No account?</div>
                    <router-link
                      to="/signup"
                      style="text-decoration:none"
                    >
                      <span class="ml-4 font-weight-medium">
                        Create account
                      </span>
                    </router-link>
                  </v-col>
                  <v-col class="py-0 pr-3">
                    <v-row justify="end">
                      <v-btn
                        @click="signIn()"
                        color="pink lighten-2"
                        depressed
                        dark
                        class="mr-8"
                      >
                        SIGN IN
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '../components/Logo.vue'
import {
  mdiAccount,
  mdiEye,
  mdiEyeOff,
  mdiKey
} from '@mdi/js'
import AuthService from '../api/AuthService.js'
import BasicAuth from '../utils/BasicAuth.js'
import StringHash from '../utils/StringHash.js'

export default {
  components: {
    Logo
  },

  data: () => ({
    mdiAccount,
    mdiEye,
    mdiEyeOff,
    mdiKey,
    username: '',
    password: '',
    rememberUser: false,
    showPassword: false
  }),

  methods: {
    async signIn() {
      const hashedPassword = await StringHash.sha256(this.password)
      const basicAuthHeader = BasicAuth(this.username, hashedPassword)
      const res = await AuthService.get({
        'Authorization': basicAuthHeader
      })
      if (res.auth) {
        this.$store.commit('setLoginStatus', true)
        this.$store.commit('setBasicAuthHeader', basicAuthHeader)
        this.$store.commit('setUserInfo', res.userInfo)
        this.$store.commit('setGlobalSnackbar', {
          on: true,
          color: 'success',
          timeout: 1000,
          text: 'Sign in successfully'
        })
        if (this.rememberUser) {
          // store basic auth creds in localStorage
          localStorage.setItem('basicAuthHeader', basicAuthHeader)
        }
        // go back one page
        this.$router.go(-1)
      } else {
        this.$store.commit('setGlobalSnackbar', {
          on: true,
          color: 'error',
          timeout: 2000,
          text: 'Wrong username or password'
        })
      }
    }
  },

  created() {
    if (this.$store.state.loggedIn) {
      // return to homepage
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
.gradient-bg {
  background: rgb(238,174,202);
  background: linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
}
</style>
