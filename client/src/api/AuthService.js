import ApiConfig from './ApiConfig.js'
const axios = require('axios').default

const URL = ApiConfig.basePath + '/auth'

const AuthService = {
  // GET /api/auth
  async get(headers) {
    try {
      const res = await axios.get(URL, { headers })
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  }
}

export default AuthService
