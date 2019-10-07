import { QueryResolvers } from '../../../__generated__/brevduvor'
import { getAllDrones } from '../../../services/drones'

export const drones: QueryResolvers['drones'] = async () => {
  const drones = await getAllDrones()

  return drones.map(({ id }) => id)
}
