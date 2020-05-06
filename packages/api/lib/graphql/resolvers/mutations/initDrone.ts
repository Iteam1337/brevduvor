import { MutationResolvers } from '../../../__generated__/brevduvor'
// import { dronePost } from '../../../adapters/drone'
// import { addBooking } from '../../../services/addBooking'
// import { insertDroneTrip } from '../../../services/drones'

export const initDrone: MutationResolvers['initDrone'] = async (
  _,
  { start },
  _ctx,
  _resolvers
) => {
  try {
    // const { body } = await dronePost('/init', { start, stop })

    return JSON.stringify(start)
  } catch (err) {
    throw new Error(`Error in initDrone: ${err}`)
  }
}
