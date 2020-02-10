const router = require('express').Router()
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

router.post('/', (req, res) => {
  const C = svgCaptcha.create(req.body)
  const ct = Array.from(C.text).map(x => charType(x)).join('')
  res.send({
    charType: ct,
    ...C
  })
})

module.exports = router
