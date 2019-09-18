const express = require('express')
const drone = require('./services/drone')
const status = require('./services/status')
const bodyParser = require('body-parser')
const cors = require('cors')
const { port } = require('./config')

const app = express()

app
  .use(cors())
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.post('/init', drone.init)
app.post('/start', drone.start)
app.post('/status', status.receiveStatus)

app.listen(port, () => console.log(`Service running on ${port}!🚀`))
