import got from 'got'
import config from '../config'

export const osrmGet = (endpoint: string) =>
  got(`${config.OSRM_URL}${endpoint}`)
