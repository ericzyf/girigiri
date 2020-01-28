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
        <v-list>
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
          <v-list-item class="mx-auto pa-0" style="width:90%">
            <v-list-item-content class="py-0">
              <v-container class="py-0">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      :append-icon="mdiEye"
                      counter
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="password2"
                      label="Confirm Password"
                      :append-icon="mdiEye"
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
import { mdiEye } from '@mdi/js'

export default {
  components: {
    Logo
  },
  data: () => ({
    mdiEye,
    email: '',
    username: '',
    password: '',
    password2: ''
  })
}
</script>

<style>
.gradient-bg {
  background: rgb(238,174,202);
  background: linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
}
</style>
