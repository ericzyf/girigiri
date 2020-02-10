import ApiConfig from './ApiConfig.js'
const axios = require('axios').default

const URL = ApiConfig.basePath + '/captcha'

const CaptchaService = {
  // POST /api/captcha
  async post(req) {
    try {
      const res = await axios.post(URL, req)
      return res.data
    } catch (e) {
      return {
        error: e
      }
    }
  }
}

export default CaptchaService
