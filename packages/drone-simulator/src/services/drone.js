const got = require('got')
const directions = require('../utils/directions')
const osrm = require('./osrm')

async function simulateTrip(coords, webhookUrl) {
  for (const coord of coords) {
    const x = await waypoint(coord, webhookUrl)
  }
}

async function waypoint(
  coords,
  time = 6000,
  webhookUrl = 'https://webhook.site/df03d8f1-4286-45c5-9f1d-0d2970c5a9ef'
) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve(
        await sendDroneStatus(webhookUrl, {
          currentPos: coords,
          status: 'in progress',
          vehicle: 'Drone',
          batteryStatus: 900,
          distance: '',
          bearing: 0,
        })
      )
    }, time)
  })
}

async function init({ body: { start, stop, webhookUrl } }, res) {
  try {
    const { data } = await osrm.generate(start, stop)

    const coords = [
      [start.lon, start.lat],
      ...data.trips[0].geometry.coordinates,
      [stop.lon, stop.lat],
    ]

    const distances = coords.reduce((acc, curr, index, array) => {
      const next = array[index + 1] ? array[index + 1] : array[index]
      const distance = directions.getDistance(
        { lon: curr[0], lat: curr[1] },
        { lon: next[0], lat: next[1] }
      )
      return [...acc, distance]
    }, [])

    const totalDistance = distances.reduce((acc, curr) => {
      return (acc += curr)
    }, 0)

    console.log(distances, totalDistance)

    await simulateTrip(coords, webhookUrl)

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
