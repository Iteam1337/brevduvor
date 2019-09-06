const express = require('express')
const drone = require('./src/services/drone')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app
  .use(cors())
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.post('/setup', drone.setup)
app.post('/init', drone.init)

app.listen(port, () => console.log(`Service running on ${port}!🚀`))
