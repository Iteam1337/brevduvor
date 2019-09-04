const express = require('express')
const drone = require('./src/services/drone')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.post('/init', drone.init)

app.listen(port, () => console.log(`Service running on ${port}!🚀`))
