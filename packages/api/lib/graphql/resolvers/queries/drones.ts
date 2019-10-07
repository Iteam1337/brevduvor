import { QueryResolvers } from '../../../__generated__/brevduvor'
import { getActiveDrones } from '../../../services/drones'

export const drones: QueryResolvers['drones'] = async () => {
  const drones = await getActiveDrones()

  return drones.map(({ id }) => id)
}
