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
    }
  },

  mutations: {
    setLoginStatus(state, payload) {
      state.loggedIn = payload
    },
    setUserInfo(state, payload) {
      state.userInfo.uid = payload.uid
      state.userInfo.dateOfReg = payload.dateOfReg
      state.userInfo.username = payload.username
      state.userInfo.email = payload.email
      state.userInfo.gender = payload.gender
    },
    clearUserInfo(state) {
      state.userInfo = {
        uid: 0,
        dateOfReg: '',
        username: '',
        email: '',
        gender: 0
      }
    }
  }
})
