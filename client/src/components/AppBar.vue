<template>
  <v-app-bar
    app
    dark
    hide-on-scroll
    color="pink lighten-2"
  >
    <v-toolbar-title>
      <router-link
        to="/"
        active-class="no-text-decoration"
        exact-active-class="no-text-decoration"
      >
        <Logo class="white--text"></Logo>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>{{ mdiMagnify }}</v-icon>
    </v-btn>
    <router-link to="/signin">
      <v-btn color="white" class="pink--text text--lighten-2">
        <v-icon left>{{ mdiAccountCircle }}</v-icon>
        SIGN IN
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
import Logo from './Logo.vue'
import { mdiMagnify } from '@mdi/js'
import { mdiAccountCircle } from '@mdi/js'

export default {
  components: {
    Logo
  },
  data: () => ({
    mdiMagnify,
    mdiAccountCircle
  }),
}
</script>

<style>
.no-text-decoration {
  text-decoration: none;
}
</style>
