const { RESTDataSource } = require('apollo-datasource-rest')
import config from '../config'
import { Coordinates } from '../__generated__/brevduvor'

const latLon = ({ lat, lon }: Coordinates): string => `${lon},${lat}`

export default class OsrmAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = config.OSRM_URL
  }

  async getTrip(
    start: Coordinates,
    stop: Coordinates,
    extras = []
  ): Promise<OSRMTripResponse> {
    const destinations = this.toOSRMFormat(start, stop, extras)

    return this.get(`trip/v1/car/${destinations}`, {
      steps: true,
      geometries: 'geojson',
    })
  }

  toOSRMFormat(
    startPosition: Coordinates,
    endPosition: Coordinates,
    extras = []
  ) {
    return [startPosition, ...extras, endPosition]
      .filter(x => x)
      .map(latLon)
      .join(';')
  }
}

export type OSRMTripResponse = {
  code: string
  trips: [OSRMTrip]
  waypoints: any
}

export type OSRMTrip = {
  geometry: {
    coordinates: [[string, string]]
    type: string
  }
  legs: any
  distance: number
  duration: number
  weight_name: string
  weight: number
}
