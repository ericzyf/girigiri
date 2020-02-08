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
                v-model="email"
                label="Email"
                clearable
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mx-auto" style="width:90%">
            <v-list-item-content>
              <v-text-field
                v-model="username"
                label="Username"
                clearable
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mx-auto" style="width:90%">
            <v-list-item-content>
              <v-select
                v-model="gender"
                :items="genders"
                label="Gender"
              ></v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mx-auto pa-0" style="width:90%">
            <v-list-item-content class="py-0">
              <v-container class="py-0">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      :append-icon="showPassword ? mdiEye : mdiEyeOff"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                      counter
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="password2"
                      label="Confirm Password"
                      :append-icon="showPassword2 ? mdiEye : mdiEyeOff"
                      :type="showPassword2 ? 'text' : 'password'"
                      @click:append="showPassword2 = !showPassword2"
                      counter
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mx-auto" style="width:90%">
            <v-list-item-content>
              <v-btn
                @click="signUp()"
                color="pink lighten-2"
                depressed
                dark
                class="mr-8"
              >
                SIGN UP
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '../components/Logo.vue'
import { mdiEye, mdiEyeOff } from '@mdi/js'
import UsersService from '../api/UsersService.js'
import BasicAuth from '../utils/BasicAuth.js'
import StringHash from '../utils/StringHash.js'

export default {
  components: {
    Logo
  },

  data: () => ({
    mdiEye,
    mdiEyeOff,
    email: '',
    username: '',
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false,
    genders: ['Secret', 'Male', 'Female'],
    gender: ''
  }),

  methods: {
    async signUp() {
      let userInfo = {
        username: this.username,
        password: await StringHash.sha256(this.password),
        email: this.email,
        gender: this.getGenderId(this.gender)
      }
      const res = await UsersService.post(userInfo)
      if (res.hasOwnProperty('error')) {
        // failed to create new user
        const usedKey = res.usedKey
        let text
        if (usedKey.username && usedKey.email) {
          text = 'The username and email are'
        } else if (usedKey.username && !usedKey.email) {
          text = 'The username is'
        } else if (!usedKey.username && usedKey.email) {
          text = 'The email is'
        }
        text += ' already in use'
        this.$store.commit('setGlobalSnackbar', {
          on: true,
          color: 'error',
          timeout: 2000,
          text
        })
      } else {
        // sign up successfully
        // sign in with the new account
        const basicAuthHeader = BasicAuth(res.username, res.password)
        this.$store.commit('setLoginStatus', true)
        this.$store.commit('setBasicAuthHeader', basicAuthHeader)
        this.$store.commit('setUserInfo', res)
        this.$store.commit('setGlobalSnackbar', {
          on: true,
          color: 'success',
          timeout: 2000,
          text: 'Your account has been created'
        })
        // return to homepage
        this.$router.push({ path: '/' })
      }
    },
    getGenderId(g) {
      for (let i = 0; i < this.genders.length; ++i) {
        if (this.genders[i] === g) {
          return i
        }
      }
      return 0
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
