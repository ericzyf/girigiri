<template>
  <v-app>
    <v-app-bar
      app
      dark
      hide-on-scroll
      color="pink lighten-2"
    >
      <v-toolbar-title class="font-weight-medium">ギリギリ</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>{{ mdiMagnify }}</v-icon>
      </v-btn>
      <v-btn color="white" class="pink--text text--lighten-2">SIGN IN</v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mdiMagnify } from '@mdi/js'

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    mdiMagnify
  }),
}
</script>
