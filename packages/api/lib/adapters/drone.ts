import got from 'got'
import config from '../config'

export const dronePost = (endpoint: string, body: any) =>
  got(`${config.DRONE_URL}${endpoint}`, { body, json: true })
