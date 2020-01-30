'use strict'

const compression = require('compression')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
const PORT = 8081

app.get('/api', (req, res) => res.send([
  '/api/users'
]))

////////////
// users api
let USERS = new Map()
let USERS_NEXTUID = 0

app.get('/api/users', (req, res) => {
  res.status(200).send(Array.from(USERS.values()))
})

app.post('/api/users', (req, res) => {
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

app.get('/api/users/:uid', (req, res) => {
  const uid = parseInt(req.params.uid)
  if (USERS.has(uid)) {
    res.status(200).send(USERS.get(uid))
  } else {
    res.status(404).send({
      error: `GET /api/users/${uid}: user not found`
    })
  }
})

app.put('/api/users/:uid', (req, res) => {
  const uid = parseInt(req.params.uid)
  if (USERS.has(uid)) {
    USERS.set(uid, req.body)
    res.status(201).send(req.body)
  } else {
    res.status(404).send({
      error: `PUT /api/users/${uid}: user not found`
    })
  }
})

app.patch('/api/users/:uid', (req, res) => {
  const uid = parseInt(req.params.uid)
  if (USERS.has(uid)) {
    const patchedUser = Object.assign(USERS.get(uid), req.body)
    res.status(201).send(patchedUser)
  } else {
    res.status(404).send({
      error: `PATCH /api/users/${uid}: user not found`
    })
  }
})

app.delete('/api/users/:uid', (req, res) => {
  const uid = parseInt(req.params.uid)
  if (USERS.has(uid)) {
    USERS.delete(uid)
    res.status(204).send()
  } else {
    res.status(404).send({
      error: `DELETE /api/users/${uid}: user not found`
    })
  }
})
// END OF USERS API
///////////////////

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
