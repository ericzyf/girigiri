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

// users api
app.use('/api/users', require('./UsersRouter.js'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
