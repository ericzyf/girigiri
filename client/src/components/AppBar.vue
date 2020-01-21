<template>
  <v-app-bar
    app
    dark
    hide-on-scroll
    color="pink lighten-2"
  >
    <v-toolbar-title id="logo">
      <router-link to="/" class="white--text font-weight-medium">ギリギリ</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>{{ mdiMagnify }}</v-icon>
    </v-btn>
    <router-link to="/signin">
      <v-btn color="white" class="pink--text text--lighten-2">SIGN IN</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
import { mdiMagnify } from '@mdi/js'

export default {
  data: () => ({
    mdiMagnify
  }),
}
</script>

<style>
#logo a {
  text-decoration: none;
}
</style>
