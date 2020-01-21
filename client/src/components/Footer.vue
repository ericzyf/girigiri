<template>
  <v-footer
    app
    absolute
    padless
    color="grey lighten-5"
    elevation="3"
  >
    <span class="pl-2 font-weight-light">
      made with
      <v-icon color="#41b883">{{ mdiVuejs }}</v-icon>
    </span>
    <v-spacer></v-spacer>
    <span class="font-weight-light">
      &copy; 2020 girigiri
    </span>
    <v-spacer></v-spacer>
    <v-btn
      icon
      target="_blank"
      href="https://github.com/ericzyf/girigiri"
    >
      <v-icon>{{ mdiGithubCircle }}</v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
import { mdiVuejs } from '@mdi/js'
import { mdiGithubCircle } from '@mdi/js'

export default {
  data: () => ({
    mdiVuejs,
    mdiGithubCircle
  })
}
</script>