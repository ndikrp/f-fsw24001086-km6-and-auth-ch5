require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const router = require('./routes')

const app = express()
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev'))

app.use(express.json())

app.use(router)

module.exports = app