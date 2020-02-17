<template>
  <v-container fluid>
    <p>{{ userInfo }}</p>
    <v-card
      max-width="250"
      tile
    >
      <v-list>
        <v-subheader>Personal settings</v-subheader>
        <v-list-item-group v-model="settingsIndex">
          <v-list-item
            color="pink lighten-2"
          >
            <v-list-item-icon>
              <v-icon>{{ mdiAccountBadgeHorizontal }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            color="pink lighten-2"
          >
            <v-list-item-icon>
              <v-icon>{{ mdiAccountCircle }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            color="pink lighten-2"
          >
            <v-list-item-icon>
              <v-icon>{{ mdiShieldAccount }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Security</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import {
  mdiAccountBadgeHorizontal,
  mdiAccountCircle,
  mdiShieldAccount
} from '@mdi/js'

export default {
  data: () => ({
    mdiAccountBadgeHorizontal,
    mdiAccountCircle,
    mdiShieldAccount,
    settingsIndex: 0
  }),

  computed: {
    userInfo() {
      return JSON.stringify(this.$store.state.userInfo)
    }
  }
}
</script>
