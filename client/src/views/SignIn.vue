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
                label="Username"
                clearable
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mx-auto" style="width:90%">
            <v-list-item-content>
              <v-text-field
                label="Password"
                :append-icon="mdiEye"
                counter
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-checkbox
                label="Remember me"
                color="pink"
                class="ml-6"
              ></v-checkbox>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-container>
                <v-row>
                  <v-col>
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
                  <v-col>
                    <v-row justify="end">
                      <v-btn
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
import { mdiEye } from '@mdi/js'

export default {
  components: {
    Logo
  },
  data: () => ({
    mdiEye
  })
}
</script>

<style>
.gradient-bg {
  background: rgb(238,174,202);
  background: linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
}
</style>
