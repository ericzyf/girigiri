const auth = require('basic-auth')
const UsersDb = require('./db/Users.js')
const router = require('express').Router()

router.get('/', (req, res) => {
  const creds = auth(req)
  const checkCreds = (name, pass) => {
    const UsersArray = Array.from(UsersDb.store.values())
    const user = UsersArray.find(e => e.username === name)
    if (typeof user === 'undefined') {
      return false
    }
    return user.password === pass
  }
  if (!creds || !checkCreds(creds.name, creds.pass)) {
    res.send({
      auth: false
    })
  } else {
    res.send({
      auth: true
    })
  }
})

module.exports = router
