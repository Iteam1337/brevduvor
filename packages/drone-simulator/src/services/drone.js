const osrm = require('./osrm')
const moment = require('moment')
const directions = require('../utils/directions')
const got = require('got')

const DRONE_SPEED = 100

const interpolateCoords = async options => {
  let batteryStatus = options.batteryStatus
  const KM_IN_DEGREE = 110.562
  const SECONDS_IN_HOUR = 3600
  const UPDATE_INTERVAL = 500
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
      sendDroneStatus(options.webhookUrl, {
        currentPos: current.coords,
        status: 'Arrived',
        vehicle: 'Drone',
        batteryStatus,
        bearing: 0,
      })
    }
  }

  const step = () => {
    currentStep++
    if (currentStep < numSteps) {
      current.coords.lat += rate.lat
      current.coords.lon += rate.lon

      sendDroneStatus(options.webhookUrl, {
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

    interpolateCoords({ coords, speed: DRONE_SPEED, batteryStatus, webhookUrl })

    res.send({ status: 200 })
  } catch (err) {}
}

async function setup({ body: { start, stop, webhookUrl } }, res) {
  const osrmTrip = await osrm.generate(start, stop)

  const coords = [
    [start.lon, start.lat],
    ...osrmTrip.data.trips[0].geometry.coordinates,
    [stop.lon, stop.lat],
  ].map(cords => ({
    lon: cords[0],
    lat: cords[1],
  }))

  const batteryStatus = 1000
  const totalDistance = directions.calculateTotalDistance(coords)

  await sendInitStatus(webhookUrl, {
    start,
    stop,
    currentPos: start,
    distance: totalDistance,
    bearing: 0,
    status: 'initiating',
    vehicle: 'Drone',
    batteryStatus,
    departure: moment().format(),
    eta: moment()
      .add(directions.etaInMinutes(200, totalDistance), 'minutes')
      .format(),
  })
}

function sendDroneStatus(webhookUrl, postBody) {
  return got(webhookUrl, { body: postBody, json: true })
}

function sendInitStatus(webhookUrl, postBody) {
  return got(webhookUrl, { body: postBody, json: true })
}

module.exports = {
  init,
  setup,
}
