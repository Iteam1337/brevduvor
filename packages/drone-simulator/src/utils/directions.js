function getDistance(start, stop) {
  // Using Haversine formula
  // https://en.wikipedia.org/wiki/Haversine_formula
  const radius = 6371000 // earth radius in meters
  const x1 = stop.lat - start.lat
  const x2 = stop.lon - start.lon
  const dLat = toRadians(x1)
  const dLon = toRadians(x2)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(start.lat)) *
      Math.cos(toRadians(stop.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = radius * c
  return distance
}

function toRadians(x) {
  return x * 0.017453292519943295 // x * Math.PI / 180
}

const calculateTotalDistance = coordsList => {
  return coordsList
    .reduce((acc, curr, index, array) => {
      const next = array[index + 1] ? array[index + 1] : array[index]

      const distance = getDistance(curr, next)

      return [...acc, distance]
    }, [])
    .reduce((acc, curr) => {
      return (acc += curr)
    }, 0)
}

const etaInMinutes = (speed, totalDistance) => {
  return (totalDistance / 1000 / speed) * 60
}

module.exports = {
  getDistance,
  calculateTotalDistance,
  etaInMinutes,
}
