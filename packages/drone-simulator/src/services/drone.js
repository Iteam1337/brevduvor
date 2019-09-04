const got = require('got')
const directions = require('../utils/directions')
const osrm = require('./osrm')

async function init({ body: { start, stop, webhookUrl } }, res) {
  try {
    const {
      data: { routes, waypoints, code },
    } = await osrm.generate(start, stop)

    console.log(routes, waypoints)

    const webhookRes = await sendDroneStatus(webhookUrl, {
      start,
      stop,
      currentPos: start,
      distance: directions.getDistance(start, stop),
      bearing: 0,
      status: 'initiating',
      vehicle: 'Drone',
      batteryStatus: 1000,
    })

    res.json({ status: 'OK' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'ERROR', error })
  }
}

async function sendDroneStatus(webhookUrl, postBody) {
  return got(webhookUrl, { body: postBody, json: true })
}

module.exports = {
  init,
}
