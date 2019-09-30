import { QueryResolvers } from '../../../__generated__/brevduvor'
import { droneGet } from '../../../adapters/drone'

export const drones: QueryResolvers['drones'] = async () => {
  try {
    console.log('drones in resolver  before: ')
    const { body } = await droneGet('/drones')
    return JSON.parse(body)
  } catch (error) {
    return error
  }
}
