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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02"
        width="19.6" height="17" style="vertical-align:middle"
      >
        <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"/>
        <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"/>
      </svg>
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
import { mdiGithubCircle } from '@mdi/js'

export default {
  data: () => ({
    mdiGithubCircle
  })
}
</script>