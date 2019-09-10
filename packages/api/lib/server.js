const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const routes = require('./routes.js')

const app = express()
const port = config.SERVER_PORT

app
  .use(cors())
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

const server = require('http').Server(app)
const io = require('socket.io')(server)

routes(app, io)

server.listen(port, console.log(`Service running on ${port}! 🚀`))
