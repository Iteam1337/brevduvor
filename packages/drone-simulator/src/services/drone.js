const got = require('got')
const directions = require('../utils/directions')
const osrm = require('./osrm')

async function simulateTrip(data, webhookUrl) {
  const coords = [...data.coords]
  for (const coord of coords) {
    const x = await waypoint(coord, data, webhookUrl)
  }
}

async function waypoint(
  coord,
  data,
  webhookUrl = 'https://webhook.site/df03d8f1-4286-45c5-9f1d-0d2970c5a9ef',
  time = 6000
) {
  return await new Promise((resolve, reject) => {
    setTimeout(async () => {
      console.log('lapp', coord)
      const travelledDistance = data.distances.shift()
      data.travelledDistance += travelledDistance
      data.totalDistance -= travelledDistance

      resolve(
        await sendDroneStatus(webhookUrl, {
          currentPos: coord,
          status: 'in progress',
          vehicle: 'Drone',
          batteryStatus: 900,
          totalDistance: data.totalDistance,
          travelledDistance: data.travelledDistance,
          distances: data.distances,
          bearing: 0,
        })
      )
    }, time)
  })
}

async function init({ body: { start, stop, webhookUrl } }, res) {
  try {
    const osrmTrip = await osrm.generate(start, stop)

    const coords = [
      [start.lon, start.lat],
      ...osrmTrip.data.trips[0].geometry.coordinates,
      [stop.lon, stop.lat],
    ]

    // calculate all waypoint distances

    const distances = coords.reduce((acc, curr, index, array) => {
      const next = array[index + 1] ? array[index + 1] : array[index]
      const distance = directions.getDistance(
        { lon: curr[0], lat: curr[1] },
        { lon: next[0], lat: next[1] }
      )
      return [...acc, distance]
    }, [])

    // calculate total distance

    const totalDistance = distances.reduce((acc, curr) => {
      return (acc += curr)
    }, 0)
    console.log('Distances -->', distances, totalDistance)

    const data = {
      coords,
      distances,
      totalDistance,
      travelledDistance: 0,
    }

    await simulateTrip(data, webhookUrl)

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
