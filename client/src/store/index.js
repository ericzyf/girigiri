import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    userInfo: {
      uid: 0,
      dateOfReg: '',
      username: '',
      email: '',
      gender: 0
    },
    gSnackbar: {
      on: false,
      color: undefined,
      timeout: 6000,
      text: ''
    }
  },

  mutations: {
    setLoginStatus(state, payload) {
      state.loggedIn = payload
    },
    setUserInfo(state, payload) {
      for (const prop in state.userInfo) {
        if (payload.hasOwnProperty(prop)) {
          state.userInfo[prop] = payload[prop]
        }
      }
    },
    clearUserInfo(state) {
      state.userInfo = {
        uid: 0,
        dateOfReg: '',
        username: '',
        email: '',
        gender: 0
      }
    },
    setGlobalSnackbar(state, payload) {
      for (const prop in state.gSnackbar) {
        if (payload.hasOwnProperty(prop)) {
          state.gSnackbar[prop] = payload[prop]
        }
      }
    }
  }
})
