const auth = require('basic-auth')
const express = require('express')
const router = express.Router()

let USERS = new Map()
let USERS_NEXTUID = 0

// GET /api/users
router.get('/', (req, res) => {
  const creds = auth(req)
  const checkCreds = (name, pass) => {
    return true
  }
  if (!creds || !checkCreds(creds.name, creds.pass)) {
    res.status(401).send({
      error: 'Access denied'
    })
  } else {
    res.status(200).send(Array.from(USERS.values()))
  }
})

// POST /api/users
router.post('/', (req, res) => {
  const user = {
    uid: USERS_NEXTUID,
    dateOfReg: new Date().toJSON(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    gender: req.body.gender
  }
  USERS.set(USERS_NEXTUID, user)
  ++USERS_NEXTUID
  res.status(201).send(user)
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
    if (USERS.has(uid)) {
      res.status(200).send(USERS.get(uid))
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
    if (USERS.has(uid)) {
      USERS.set(uid, req.body)
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
    if (USERS.has(uid)) {
      const patchedUser = Object.assign(USERS.get(uid), req.body)
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
    if (USERS.has(uid)) {
      USERS.delete(uid)
      res.status(204).send()
    } else {
      res.status(404).send({
        error: `DELETE /api/users/${uid}: user not found`
      })
    }
  }
})

module.exports = router
