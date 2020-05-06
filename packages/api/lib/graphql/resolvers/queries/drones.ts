// import { getAllDrones } from '../../../services/drones'
import { QueryResolvers } from '../../../__generated__/brevduvor'

export const drones: QueryResolvers['drones'] = async (
  _,
  _args,
  { dataSources: { flyPulse } }
) => {
  const drones = await flyPulse.getDrones()

  return drones
}
