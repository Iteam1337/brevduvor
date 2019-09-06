const express = require('express')
const app = express()
const port = 4000
const routes = require('./routes.js')
const bodyParser = require('body-parser')
const cors = require('cors')

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
