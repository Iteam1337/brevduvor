const osrm = require('../adapters/osrm')
const latLon = ({ lat, lon }) => `${lon},${lat}`

function genRoute({ startPosition, endPosition, extras = [] }) {
  const destinations = [startPosition, ...extras, endPosition]
    .filter(x => x)
    .map(latLon)
    .join(';')

  return `/trip/v1/car/${destinations}?steps=true&geometries=geojson`
}

module.exports = {
  async generate(startPosition, endPosition, extras = []) {
    return osrm.get(
      `${genRoute({
        startPosition,
        endPosition,
        extras,
      })}`
    )
  },
}
