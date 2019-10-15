import { osrmGet } from '../adapters/osrm'
import { Coordinates } from '../__generated__/brevduvor'

const latLon = ({ lat, lon }: Coordinates) => `${lon},${lat}`

interface GenRouteInput {
  startPosition: Coordinates
  endPosition: Coordinates
  extras?: []
}

function genRoute({ startPosition, endPosition, extras = [] }: GenRouteInput) {
  const destinations = [startPosition, ...extras, endPosition]
    .filter(x => x)
    .map(latLon)
    .join(';')

  return `/trip/v1/car/${destinations}?steps=true&geometries=geojson`
}

export const generate = async (
  startPosition: Coordinates,
  endPosition: Coordinates,
  extras: []
) =>
  osrmGet(
    `${genRoute({
      startPosition,
      endPosition,
      extras,
    })}`
  )
