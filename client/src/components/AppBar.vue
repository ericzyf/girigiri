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
        style="text-decoration:none"
      >
        <Logo class="white--text"></Logo>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-if="showSearchbar">
      <v-text-field
        v-model="searchKeywords"
        placeholder="Search"
        clearable
        style="max-width:250px"
      ></v-text-field>
    </template>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on"
          @click="showSearchbar = !showSearchbar"
        >
          <v-icon>{{ mdiMagnify }}</v-icon>
        </v-btn>
      </template>
      <span>Search</span>
    </v-tooltip>

    <template v-if="loggedIn">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>{{ mdiVideoPlus }}</v-icon>
          </v-btn>
        </template>
        <span>Upload video</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>{{ mdiBell }}</v-icon>
          </v-btn>
        </template>
        <span>Notifications</span>
      </v-tooltip>
      <v-menu
        offset-y
        open-on-hover
      >
        <template
          v-slot:activator="{ on }"
        >
          <v-btn
            fab color="primary"
            width="40" height="40"
            v-on="on"
            class="ml-3"
          >
            <v-avatar size="40">
              <span class="white--text headline">
                {{ userInfo.username }}
              </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="true">
            <v-list-item-title>
              Menu1
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="true">
            <v-list-item-title>
              Menu2
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="true">
            <v-list-item-title>
              Menu3
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-else>
      <v-btn
        color="white"
        class="pink--text text--lighten-2"
        to="/signin"
      >
        <v-icon left>{{ mdiAccountCircle }}</v-icon>
        SIGN IN
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import Logo from './Logo.vue'
import {
  mdiAccountCircle,
  mdiBell,
  mdiMagnify,
  mdiVideoPlus
} from '@mdi/js'

export default {
  components: {
    Logo
  },

  data: () => ({
    mdiAccountCircle,
    mdiBell,
    mdiMagnify,
    mdiVideoPlus,
    showSearchbar: false,
    searchKeywords: ''
  }),

  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  }
}
</script>
