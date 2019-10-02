import got from 'got'
import config from '../config'

export const dronePost = (endpoint: string, body: any) => {
  return got(`${config.DRONE_URL}${endpoint}`, { body, json: true })
}

export const droneGet = (endpoint: string) =>
  got(`${config.DRONE_URL}${endpoint}`)
