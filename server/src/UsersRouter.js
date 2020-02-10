const auth = require('basic-auth')
const express = require('express')
const UsersDb = require('./db/Users.js')
const _ = require('./utils/utils.js')
const router = express.Router()

// GET /api/users
router.get('/', (req, res) => {
  if (_.isEmptyObject(req.query)) {
    // no query string
    const creds = auth(req)
    const checkCreds = (name, pass) => {
      return true
    }
    if (!creds || !checkCreds(creds.name, creds.pass)) {
      res.status(401).send({
        error: 'Access denied'
      })
    } else {
      res.status(200).send(Array.from(UsersDb.store.values()))
    }
  } else {
    // has query string
    const Q = req.query
    // query operations
    const OP = {
      MAIL_NAME_AVAIL: '0'  // (0).toString(36)
    }

    switch (Q.op) {
      case OP.MAIL_NAME_AVAIL:
        /**
         * check if the given email and username are already in use
         *
         * query string example:
         * qs.stringify(
         *   {
         *      op: '0',
         *      m: ${email},
         *      n: ${username}
         *   }
         * )
         */
        const usersArray = Array.from(UsersDb.store.values())
        const u = usersArray.find(e => e.username === Q.n || e.email === Q.m)
        if (_.isUndefined(u)) {
          // email and username are available
          res.send({
            avail: true
          })
        } else {
          // email or/and username is/are already in use
          res.send({
            avail: false,
            usedKey: {
              email: u.email === Q.m,
              username: u.username === Q.n
            }
          })
        }
        break

      default:
        res.status(400).send({
          error: 'Unknown query operation'
        })
    }
  }
})

// POST /api/users
router.post('/', (req, res) => {
  const user = {
    uid: UsersDb.getNextUid(),
    dateOfReg: new Date().toJSON(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    gender: req.body.gender
  }
  const usersArray = Array.from(UsersDb.store.values())
  const u = usersArray.find(e => e.username === user.username || e.email === user.email)
  if (typeof u === 'undefined') {
    // username and email have not been used, create the new user
    UsersDb.store.set(UsersDb.getNextUid(), user)
    UsersDb.incNextUid()
    res.status(201).send(user)
  } else {
    const usedKey = {
      username: u.username === user.username,
      email: u.email === user.email
    }
    res.status(403).send({
      error: 'This username or email has already been used',
      usedKey
    })
  }
})

// GET /api/users/:uid
router.get('/:uid', (req, res) => {
  const creds = auth(req)
  const checkCreds = (name, pass) => {
    return true
  }
  if (!creds || !checkCreds(creds.name, creds.pass)) {
    res.status(401).send({
      error: 'Access denied'
    })
  } else {
    const uid = parseInt(req.params.uid)
    if (Number.isNaN(uid)) {
      res.status(400).send({
        error: 'uid is NaN'
      })
    } else if (UsersDb.store.has(uid)) {
      res.status(200).send(UsersDb.store.get(uid))
    } else {
      res.status(404).send({
        error: `GET /api/users/${uid}: user not found`
      })
    }
  }
})

// PUT /api/users/:uid
router.put('/:uid', (req, res) => {
  const creds = auth(req)
  const checkCreds = (name, pass) => {
    return true
  }
  if (!creds || !checkCreds(creds.name, creds.pass)) {
    res.status(401).send({
      error: 'Access denied'
    })
  } else {
    const uid = parseInt(req.params.uid)
    if (Number.isNaN(uid)) {
      res.status(400).send({
        error: 'uid is NaN'
      })
    } else if (UsersDb.store.has(uid)) {
      UsersDb.store.set(uid, req.body)
      res.status(201).send(req.body)
    } else {
      res.status(404).send({
        error: `PUT /api/users/${uid}: user not found`
      })
    }
  }
})

// PATCH /api/users/:uid
router.patch('/:uid', (req, res) => {
  const creds = auth(req)
  const checkCreds = (name, pass) => {
    return true
  }
  if (!creds || !checkCreds(creds.name, creds.pass)) {
    res.status(401).send({
      error: 'Access denied'
    })
  } else {
    const uid = parseInt(req.params.uid)
    if (Number.isNaN(uid)) {
      res.status(400).send({
        error: 'uid is NaN'
      })
    } else if (UsersDb.store.has(uid)) {
      const patchedUser = Object.assign(UsersDb.store.get(uid), req.body)
      res.status(201).send(patchedUser)
    } else {
      res.status(404).send({
        error: `PATCH /api/users/${uid}: user not found`
      })
    }
  }
})

// DELETE /api/users/:uid
router.delete('/:uid', (req, res) => {
  const creds = auth(req)
  const checkCreds = (name, pass) => {
    return true
  }
  if (!creds || !checkCreds(creds.name, creds.pass)) {
    res.status(401).send({
      error: 'Access denied'
    })
  } else {
    const uid = parseInt(req.params.uid)
    if (Number.isNaN(uid)) {
      res.status(400).send({
        error: 'uid is NaN'
      })
    } else if (UsersDb.store.has(uid)) {
      UsersDb.store.delete(uid)
      res.status(204).send()
    } else {
      res.status(404).send({
        error: `DELETE /api/users/${uid}: user not found`
      })
    }
  }
})

module.exports = router
