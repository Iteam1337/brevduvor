const got = require('got')
const directions = require('../utils/directions')
const osrm = require('./osrm')

const geoSim = async options => {
  let batteryStatus = options.batteryStatus
  const KM_IN_DEGREE = 110.562
  const SECONDS_IN_HOUR = 3600
  const UPDATE_INTERVAL = 1000
  let coords = options.coords,
    speed = (options.speed || 40) / SECONDS_IN_HOUR,
    current = {
      coords: {
        lat: 0,
        lon: 0,
      },
    },
    rate = { lat: 0, lon: 0 },
    index = -1,
    numSteps,
    currentStep

  const nextCoord = async () => {
    index++
    if (index < coords.length - 1) {
      const coord = coords[index]

      current.coords.lat = coord.lat
      current.coords.lon = coord.lon

      const deltaLat = (coords[index + 1].lat - coord.lat) * KM_IN_DEGREE
      const deltaLon = (coords[index + 1].lon - coord.lon) * KM_IN_DEGREE

      const deltaDist = Math.sqrt(deltaLat * deltaLat + deltaLon * deltaLon)
      const deltaSeconds = Math.floor(deltaDist / speed)

      rate.lat = deltaLat / deltaSeconds / KM_IN_DEGREE
      rate.lon = deltaLon / deltaSeconds / KM_IN_DEGREE

      numSteps = deltaSeconds
      currentStep = 0

      setTimeout(step, UPDATE_INTERVAL)
    } else {
      console.log('you have arrived')
      await sendDroneStatus(options.webhookUrl, {
        currentPos: current.coords,
        status: 'Arrived',
        vehicle: 'Drone',
        batteryStatus,
        bearing: 0,
      })
    }
  }

  const step = async () => {
    currentStep++
    if (currentStep < numSteps) {
      current.coords.lat += rate.lat
      current.coords.lon += rate.lon

      await sendDroneStatus(options.webhookUrl, {
        currentPos: current.coords,
        status: 'in progress',
        vehicle: 'Drone',
        batteryStatus,
        bearing: 0,
      })

      setTimeout(step, UPDATE_INTERVAL)
    } else {
      nextCoord()
    }
  }
  nextCoord()
}

async function init({ body: { start, stop, webhookUrl } }, res) {
  try {
    const batteryStatus = 1000
    const osrmTrip = await osrm.generate(start, stop)

    const coords = [
      [start.lon, start.lat],
      ...osrmTrip.data.trips[0].geometry.coordinates,
      [stop.lon, stop.lat],
    ].map(cords => ({
      lon: cords[0],
      lat: cords[1],
    }))

    await sendDroneStatus(webhookUrl, {
      start,
      stop,
      currentPos: start,
      distance: directions.getDistance(start, stop),
      bearing: 0,
      status: 'initiating',
      vehicle: 'Drone',
      batteryStatus,
    })

    await geoSim({ coords, speed: 200, webhookUrl, batteryStatus })

    res.json({ status: 'OK' })
  } catch (err) {}
}

async function sendDroneStatus(webhookUrl, postBody) {
  return got(webhookUrl, { body: postBody, json: true })
}

module.exports = {
  init,
}
