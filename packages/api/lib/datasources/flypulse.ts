import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { Destination } from '../__generated__/brevduvor'
import config from '../config'

export default class FlyPulse extends RESTDataSource {
  private token: String

  constructor() {
    super()

    this.baseURL = config.FLYPULSE.host
    this.token = ''
  }

  async getAuthToken() {
    try {
      const data = await this.post('/authorize/', {
        username: config.FLYPULSE.user,
        password: config.FLYPULSE.password,
      })

      this.token = data.access_token
    } catch (error) {
      console.warn(error)
    }
  }

  createWaypoint(lat: number, lon: number) {
    return {
      frame: 3,
      autocontinue: true,
      is_current: true,
      index: 0,
      command: 16,
      time: 0,
      done_radius: 0,
      orbit_radius: 0,
      yaw: 0,
      altitude: 20,
      latitude: lat,
      longitude: lon,
    }
  }

  createMission(from: Destination, to: Destination) {
    return this.post('/mission/', {
      name: `${from.alias}:${to.alias}:${Date.now()}`,
      follow_terrain: false,
      way_points: [
        this.createWaypoint(from.lat, from.lon),
        this.createWaypoint(to.lat, to.lon),
      ],
    })
  }

  loadBooking(droneId: number, missionId: string) {
    try {
      return this.post('/mission/push_to_vehicle', {
        mission_id: missionId,
        vehicle_id: droneId,
      })
    } catch (error) {
      console.log('load booking error', error)
      return Promise.resolve()
    }
  }

  startDrone(droneId: number) {
    return this.post(`/mission/start/${droneId}`)
  }

  landDrone(droneId: number) {
    return this.post(`/mission/abort/${droneId}`)
  }

  async getDrones() {
    const drones = await this.get('/vehicle')

    return drones.vehicle.map((drone: any) => ({
      id: drone.id,
      status: drone.vehicle_status,
      description: drone.description,
      name: drone.name,
      active: drone.active,
    }))
  }

  async willSendRequest(request: RequestOptions) {
    if (request.path === '/authorize/') {
      return
    }
    this.token || (await this.getAuthToken())

    request.headers.set('Authorization', `bearer ${this.token}`)
  }
}
