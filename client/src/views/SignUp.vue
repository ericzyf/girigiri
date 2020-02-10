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
        <v-progress-linear
          rounded v-model="progress"
          :color="progress === 100 ? 'pink lighten-2' : 'primary'"
        ></v-progress-linear>

        <template v-if="pageNum === 1">
          <v-list dense>
            <v-list-item class="mt-1">
              <v-list-item-content class="text-center">
                <Logo
                  class="pink--text text--lighten-2 headline"
                ></Logo>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mx-auto mt-1" style="width:90%">
              <v-list-item-content>
                <v-text-field
                  v-model="email"
                  outlined
                  label="Email"
                  clearable
                  :prepend-inner-icon="mdiEmail"
                  :rules="[rules.required]"
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
                  :rules="[rules.required]"
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
              <v-list-item-content class="pa-0">
                <v-row justify="space-between">
                  <router-link
                    to="/signin"
                    style="text-decoration:none"
                    class="my-auto"
                  >
                    <span class="ml-10 font-weight-medium">
                      Sign in instead
                    </span>
                  </router-link>
                  <v-btn
                    @click="gotoNextPage()"
                    color="pink lighten-2"
                    icon
                    class="mr-10"
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
            <v-list-item class="mt-1">
              <v-list-item-content class="text-center">
                <Logo
                  class="pink--text text--lighten-2 headline"
                ></Logo>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mx-auto mt-2" style="width:90%">
              <v-list-item-content>
                <v-text-field
                  v-model="password"
                  label="Password"
                  :append-icon="showPassword ? mdiEye : mdiEyeOff"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
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
                  outlined
                  :prepend-inner-icon="mdiShieldLock"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mx-auto mt-12 pt-7" style="width:90%">
              <v-list-item-content class="pa-0 mt-4">
                <v-row justify="space-between">
                  <v-btn
                    @click="gotoPrevPage()"
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
                    @click="signUp()"
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
  mdiAccount,
  mdiArrowLeft,
  mdiArrowRight,
  mdiEmail,
  mdiEye,
  mdiEyeOff,
  mdiHumanMaleFemale,
  mdiLock,
  mdiShieldLock
} from '@mdi/js'
import UsersService from '../api/UsersService.js'
import BasicAuth from '../utils/BasicAuth.js'
import StringHash from '../utils/StringHash.js'

export default {
  components: {
    Logo
  },

  data: () => ({
    mdiAccount,
    mdiArrowLeft,
    mdiArrowRight,
    mdiEmail,
    mdiEye,
    mdiEyeOff,
    mdiHumanMaleFemale,
    mdiLock,
    mdiShieldLock,
    email: '',
    username: '',
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false,
    genders: ['Secret', 'Male', 'Female'],
    gender: '',
    pageNum: 1,
    rules: {
      required: v => !!v || 'Required'
    }
  }),

  computed: {
    progress() {
      const progressValues = [0, 20, 40, 60, 80, 100]
      let count = 0
      if (!this.isEmptyString(this.email)) {
        ++count
      }
      if (!this.isEmptyString(this.username)) {
        ++count
      }
      if (!this.isEmptyString(this.gender)) {
        ++count
      }
      if (!this.isEmptyString(this.password)) {
        ++count
      }
      if (!this.isEmptyString(this.password2)) {
        ++count
      }
      return progressValues[count]
    }
  },

  methods: {
    async gotoNextPage() {
      const isEmailEmpty = this.isEmptyString(this.email)
      const isUsernameEmpty = this.isEmptyString(this.username)
      if (isEmailEmpty || isUsernameEmpty) {
        // activate text field validation
        if (isEmailEmpty) {
          this.email = null
        }
        if (isUsernameEmpty) {
          this.username = null
        }
        // notify user
        this.$store.commit('setGlobalSnackbar', {
          on: true,
          color: 'info',
          timeout: 2000,
          text: 'Please fill in the required fields'
        })
      } else {
        // check if the email and username are available
        const res = await UsersService.qsGet({
          op: '0',
          m: this.email,
          n: this.username
        })
        if (res.avail) {
          // email and username are available
          // go to the next page
          ++this.pageNum
        } else {
          // notify user which keys have been used
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
        }
      }
    },
    gotoPrevPage() {
      --this.pageNum
    },
    async signUp() {
      let userInfo = {
        username: this.username,
        password: await StringHash.sha256(this.password),
        email: this.email,
        gender: this.getGenderId(this.gender)
      }
      await UsersService.post(userInfo)
      // sign in with the new account
      const basicAuthHeader = BasicAuth(userInfo.username, userInfo.password)
      this.$store.commit('setLoginStatus', true)
      this.$store.commit('setBasicAuthHeader', basicAuthHeader)
      this.$store.commit('setUserInfo', userInfo)
      this.$store.commit('setGlobalSnackbar', {
        on: true,
        color: 'success',
        timeout: 2000,
        text: 'Your account has been created'
      })
      // return to homepage
      this.$router.push({ path: '/' })
    },
    getGenderId(g) {
      for (let i = 0; i < this.genders.length; ++i) {
        if (this.genders[i] === g) {
          return i
        }
      }
      return 0
    },
    isEmptyString(s) {
      return !s
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
