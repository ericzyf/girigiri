import ApiConfig from './ApiConfig.js'
const axios = require('axios').default

const URL = ApiConfig.basePath + '/users/'

const UsersService = {
  // GET /api/users
  async get() {
    try {
      const res = await axios.get(URL)
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  },

  // POST /api/users
  async post(req) {
    try {
      const res = await axios.post(URL, req)
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  },

  // GET /api/users/:uid
  async getUid(uid) {
    try {
      const res = await axios.get(`${URL}${uid}`)
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  },

  // PUT /api/users/:uid
  async putUid(uid, req) {
    try {
      const res = await axios.put(`${URL}${uid}`, req)
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  },

  // PATCH /api/users/:uid
  async patchUid(uid, req) {
    try {
      const res = await axios.patch(`${URL}${uid}`, req)
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  },

  // DELETE /api/users/:uid
  async deleteUid(uid) {
    try {
      const res = await axios.delete(`${URL}${uid}`)
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  }
}

export default UsersService
