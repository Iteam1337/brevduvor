const moment = require('moment')
const directions = require('../utils/directions')
const got = require('got')
const uuid = require('uuid/v4')
const cache = require('memory-cache')

const DRONE_SPEED = 100

const interpolateCoords = async options => {
  let batteryStatus = options.batteryStatus
  const KM_IN_DEGREE = 110.562
  const SECONDS_IN_HOUR = 3600
  const UPDATE_INTERVAL = 3000
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
      await sendDroneStatus(options.webhookUrl, {
        currentPos: current.coords,
        id: options.id,
        status: 'done',
        vehicle: 'Drone',
        batteryStatus,
        bearing: 0,
      })
      cache.clear(options.id)
    }
  }

  const step = async () => {
    currentStep++
    if (currentStep < numSteps) {
      current.coords.lat += rate.lat
      current.coords.lon += rate.lon
      const { start, stop } = cache.get(options.id)
      await sendDroneStatus(options.webhookUrl, {
        currentPos: current.coords,
        id: options.id,
        status: 'InProgress',
        vehicle: 'Drone',
        batteryStatus,
        bearing: 0,
        start,
        stop,
      })

      setTimeout(step, UPDATE_INTERVAL)
    } else {
      nextCoord()
    }
  }
  nextCoord()
}

async function start({ body: { webhookUrl, id } }, res) {
  try {
    const { coordinates } = cache.get(id)
    const batteryStatus = 1000

    interpolateCoords({
      coords: coordinates,
      speed: DRONE_SPEED,
      batteryStatus,
      webhookUrl,
      id,
    })
    res.send({ status: 200 })
  } catch (err) {
    console.log(err)
  }
}

async function init({ body: { coordinates } }, res) {
  try {
    const droneId = uuid()
    const batteryStatus = 1000
    const totalDistance = directions.calculateTotalDistance(coordinates)

    const droneData = {
      id: droneId,
      coordinates,
      distance: totalDistance,
      bearing: 0,
      status: 'initiating',
      vehicle: 'Drone',
      batteryStatus,
      departure: moment().format(),
      eta: moment()
        .add(directions.etaInMinutes(200, totalDistance), 'minutes')
        .format(),
    }

    cache.put(droneId, { id: droneId, coordinates })

    res.send(droneData)
  } catch (err) {
    console.log(err)
  }
}

async function sendDroneStatus(webhookUrl, postBody) {
  await got(webhookUrl, { body: postBody, json: true })
}

module.exports = {
  start,
  init,
}
