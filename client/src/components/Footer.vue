<template>
  <v-footer
    app
    absolute
    padless
    color="grey lighten-5"
    elevation="3"
  >
    <span class="pl-2 font-weight-light" style="width:33.333%">
      made with
      <v-icon color="#41b883">{{ mdiVuejs }}</v-icon>
    </span>
    <div style="width:33.333%">
      <p class="font-weight-light text-center my-auto">
        &copy; 2020 girigiri
      </p>
    </div>
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