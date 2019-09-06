const got = require('got')

module.exports = (app, io) => {
  io.on('connection', client => {
    console.log('socket client connected')
  })

  app.post('/setup', ({ body }, res) => {
    got('http://localhost:3000/setup', {
      body,
      json: true,
    }).catch(console.log)
  })

  app.post('/init', ({ body }, res) => {
    got('http://localhost:3000/init', {
      body,
      json: true,
    }).catch(err => {
      console.log('err ', err)
    })
  })

  app.post('/droneSetupStatus', ({ body }, res) => {
    io.emit('droneSetupStatus', body)
  })

  app.post('/droneFlightStatus', ({ body }, res) => {
    io.emit('droneFlightStatus', body)
    res.send({ status: 200 })
  })
}
