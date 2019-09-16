const { RESTDataSource } = require('apollo-datasource-rest')
import config from '../config'

const latLon = ({ lat, lon }) => `${lon},${lat}`

export default class OsrmAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = config.OSRM_URL
  }

  async getRoute(start, stop, extras = []) {
    const destinations = this.toOSRMFormat(start, stop, extras)

    return this.get(`trip/v1/car/${destinations}`, {
      steps: true,
      geometries: 'geojson',
    })
  }

  toOSRMFormat(startPosition, endPosition, extras = []) {
    return [startPosition, ...extras, endPosition]
      .filter(x => x)
      .map(latLon)
      .join(';')
  }
}
