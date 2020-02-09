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
        <v-progress-linear
          rounded v-model="progressValue"
        ></v-progress-linear>

        <template v-if="pageNum === 1">
          <v-list dense>
            <v-list-item class="mt-2">
              <v-list-item-content class="text-center">
                <Logo
                  class="pink--text text--lighten-2 headline"
                ></Logo>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mx-auto mt-5" style="width:90%">
              <v-list-item-content>
                <v-text-field
                  v-model="email"
                  outlined
                  label="Email"
                  clearable
                  :prepend-inner-icon="mdiEmail"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mx-auto" style="width:90%">
              <v-list-item-content>
                <v-text-field
                  v-model="username"
                  outlined
                  label="Username"
                  clearable
                  :prepend-inner-icon="mdiAccount"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mx-auto" style="width:90%">
              <v-list-item-content>
                <v-select
                  v-model="gender"
                  label="Gender"
                  outlined
                  :items="genders"
                  :prepend-inner-icon="mdiHumanMaleFemale"
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-row justify="end">
                  <v-btn
                    @click="nextPage()"
                    color="pink lighten-2"
                    icon
                    class="mr-12"
                    x-large
                  >
                    <v-icon>{{ mdiArrowRight }}</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
        <template v-else-if="pageNum === 2">
          <v-list dense>
            <v-list-item class="mt-2">
              <v-list-item-content class="text-center">
                <Logo
                  class="pink--text text--lighten-2 headline"
                ></Logo>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mx-auto mt-12" style="width:90%">
              <v-list-item-content>
                <v-text-field
                  v-model="password"
                  label="Password"
                  :append-icon="showPassword ? mdiEye : mdiEyeOff"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  counter
                  outlined
                  :prepend-inner-icon="mdiLock"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mx-auto" style="width:90%">
              <v-list-item-content>
                <v-text-field
                  v-model="password2"
                  label="Confirm Password"
                  :append-icon="showPassword2 ? mdiEye : mdiEyeOff"
                  :type="showPassword2 ? 'text' : 'password'"
                  @click:append="showPassword2 = !showPassword2"
                  counter
                  outlined
                  :prepend-inner-icon="mdiShieldLock"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mx-auto mt-12 pt-7" style="width:90%">
              <v-list-item-content>
                <v-row justify="space-between">
                  <v-btn
                    @click="prevPage()"
                    color="pink lighten-2"
                    icon
                    class="ml-4"
                    x-large
                  >
                    <v-icon>{{ mdiArrowLeft }}</v-icon>
                  </v-btn>
                  <v-btn
                    color="pink lighten-2"
                    depressed
                    dark
                    class="mr-4 my-auto"
                  >
                    SIGN UP
                  </v-btn>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>

      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '../components/Logo.vue'
import {
  mdiEye,
  mdiEyeOff,
  mdiEmail,
  mdiAccount,
  mdiHumanMaleFemale,
  mdiLock,
  mdiShieldLock,
  mdiArrowRight,
  mdiArrowLeft
} from '@mdi/js'
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
    mdiEmail,
    mdiAccount,
    mdiHumanMaleFemale,
    mdiLock,
    mdiShieldLock,
    mdiArrowRight,
    mdiArrowLeft,
    email: '',
    username: '',
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false,
    genders: ['Secret', 'Male', 'Female'],
    gender: '',
    pageNum: 1,
    progressValue: 0
  }),

  methods: {
    nextPage() {
      ++this.pageNum
      this.progressValue = 50
    },
    prevPage() {
      --this.pageNum
      this.progressValue = 0
    },
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
