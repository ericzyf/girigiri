'use strict'

const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()
app.use(helmet())
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
// auth api
app.use('/api/auth', require('./AuthRouter.js'))
// captcha api
app.use('/api/captcha', require('./CaptchaRouter.js'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
