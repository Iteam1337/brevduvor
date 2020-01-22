import { MutationResolvers } from '../../../__generated__/brevduvor'
// import { dronePost } from '../../../adapters/drone'
// import { insertDroneTrip } from '../../../services/drones'

export const initDrone: MutationResolvers['initDrone'] = async (
  _,
  { start, stop },
  _ctx,
  _resolvers
) => {
  try {
    // const { body } = await dronePost('/init', { start, stop })

    return JSON.stringify({ start, stop })
  } catch (err) {
    throw new Error(`Error in initDrone: ${err}`)
  }
}
