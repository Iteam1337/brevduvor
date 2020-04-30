import { MutationResolvers } from '../../../__generated__/brevduvor'
import { addBooking } from '../../../services/addBooking'
// import { dronePost } from '../../../adapters/drone'
// // import { updateTripStatus } from '../../../services/drones'
// import config from '../../../config'

export const startDrone: MutationResolvers['startDrone'] = async (
  _,
  { id },
  _ctx,
  _resolvers
) => {
  try {
    // await dronePost('/start', { id, webhookUrl: config.WEBHOOK_URL })
    addBooking()
  } catch (err) {
    throw new Error(`Error in startDrone: ${err}`)
  }
  return {
    id,
  }
}
