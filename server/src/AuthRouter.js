const auth = require('basic-auth')
const UsersDb = require('./db/Users.js')
const router = require('express').Router()

router.get('/', (req, res) => {
  const creds = auth(req)
  const usersArray = Array.from(UsersDb.store.values())

  const checkCreds = c => {
    if (!c) {
      // error parsing basic auth header
      return undefined
    }
    const u = usersArray.find(e => e.username === c.name)
    if (typeof u === 'undefined') {
      // username not found
      return undefined
    } else {
      return (u.password === c.pass) ? u : undefined
    }
  }

  const userInfo = checkCreds(creds)
  if (typeof userInfo === 'undefined') {
    res.send({
      auth: false
    })
  } else {
    res.send({
      auth: true,
      userInfo
    })
  }
})

module.exports = router
