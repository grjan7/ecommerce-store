'use strict'

const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const cart = require('./route/cartRoute')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/cart', cart)
app.use('/', express.static(path.join(__dirname, '../public')))
app.use('*', (req, res) => res.status(404).json({ Error: 'Not found.' }))

module.exports = app

