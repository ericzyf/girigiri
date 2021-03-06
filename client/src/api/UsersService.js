import ApiConfig from './ApiConfig.js'
const axios = require('axios').default
const qs = require('qs')

const URL = ApiConfig.basePath + '/users'
// axios validateStatus function
// reject only if the status code is >= 500
const validateStatus = status => (status < 500)

const UsersService = {
  // GET /api/users
  async get() {
    try {
      const res = await axios.get(URL, {
        validateStatus
      })
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  },

  // GET /api/users with query string
  async qsGet(query) {
    try {
      const Q = qs.stringify(query)
      const res = await axios.get(`${URL}?${Q}`, {
        validateStatus
      })
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
      const res = await axios.post(URL, req, {
        validateStatus
      })
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
      const res = await axios.get(`${URL}/${uid}`, {
        validateStatus
      })
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
      const res = await axios.put(`${URL}/${uid}`, req, {
        validateStatus
      })
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
      const res = await axios.patch(`${URL}/${uid}`, req, {
        validateStatus
      })
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
      const res = await axios.delete(`${URL}/${uid}`, {
        validateStatus
      })
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  }
}

export default UsersService
