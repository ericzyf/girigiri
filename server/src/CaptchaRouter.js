const crypto = require('crypto')
const router = require('express').Router()
const rateLimit = require('express-rate-limit')
const svgCaptcha = require('svg-captcha')
const _ = require('./utils/utils.js')

function charType(c) {
  if (_.isNumber(c)) {
    return 'N'
  } else if (_.isUpperCase(c)) {
    return 'U'
  } else if (_.isLowerCase(c)) {
    return 'L'
  }
  return '?'
}

router.post('/', rateLimit({
  windowMs: 60000,  // 1 minute
  max: 10
}), (req, res) => {
  const C = svgCaptcha.create(req.body)
  const hmac = crypto.createHmac('sha256', C.text)
  const hmacSign = hmac.update(C.data).digest('hex')
  const ct = Array.from(C.text).map(x => charType(x)).join('')
  res.send({
    charType: ct,
    hmacSign,
    data: C.data
  })
})

module.exports = router
