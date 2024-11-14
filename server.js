// const http = require('node:http')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const endwall = require('./api/images/endwall.js')
const image = require('./api/images/image.js')
const optionUrls = require('./api/images/optionUrls.js')

const app = express()

if (!process.env.API_CDN_URL) {
  process.env.API_CDN_URL = 'https://cdn.metrofutures.org.uk'
}

app.use(morgan('tiny'))

app.use(cors({ 
  origin: 'http://localhost:8080',
  credentials: true
}))

app.get('/api/images/endwall', endwall)
app.get('/api/images/image', image)
app.get('/api/images/optionUrls', optionUrls)

app.use(express.static('dist'))

app.listen(3000)
