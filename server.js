require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const router = require('./routes')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('./docs/swagger.json')

const app = express()
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev'))

app.use(express.json())

app.use(['/', '/api/v1/docs'], swaggerUI.serve)
app.get(['/','/api/v1/docs'], swaggerUI.setup(swaggerDoc))


app.use(router)

module.exports = app
