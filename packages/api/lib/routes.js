const got = require('got')
const config = require('./config')

module.exports = (app, io) => {
  io.on('connection', client => {
    console.log('socket client connected')
  })

  app.post('/setup', ({ body }, res) => {
    got(`${config.DRONE_URL}/setup`, {
      body,
      json: true,
    }).catch(console.log)
  })

  app.post('/init', ({ body }, res) => {
    console.log(body)
    got(`${config.DRONE_URL}/init`, {
      body,
      json: true,
    }).catch(err => {
      console.log('err ', err)
    })
  })

  app.post('/droneSetupStatus', ({ body }, res) => {
    console.log('droneSetupStatus: ', body)
    io.emit('droneSetupStatus', body)
  })

  app.post('/droneFlightStatus', ({ body }, res) => {
    console.log('droneFlightStatus: ', body)
    io.emit('droneFlightStatus', body)
    res.send({ status: 200 })
  })
}
