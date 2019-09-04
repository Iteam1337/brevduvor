function getDistance(start, stop) {
  // Using Haversine formula
  // https://en.wikipedia.org/wiki/Haversine_formula
  const radius = 6371000 // earth radius in meters
  const x1 = stop.lat - start.lat
  const x2 = stop.long - start.long
  const dLat = toRadians(x1)
  const dLong = toRadians(x2)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(start.lat)) *
      Math.cos(toRadians(stop.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = radius * c
  return distance
}

function toRadians(x) {
  return x * 0.017453292519943295 // x * Math.PI / 180
}

module.exports = {
  getDistance,
}
