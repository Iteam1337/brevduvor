import { MutationResolvers } from '../../../__generated__/brevduvor'
import { dronePost } from '../../../adapters/drone'
// import { updateTripStatus } from '../../../services/drones'
import config from '../../../config'

export const startDrone: MutationResolvers['startDrone'] = async (
  _,
  { id },
  _ctx,
  _resolvers
) => {
  try {
    await dronePost('/start', { id, webhookUrl: config.WEBHOOK_URL })
    // await updateTripStatus(id, 'in progress')
  } catch (err) {
    throw new Error(`Error in startDrone: ${err}`)
  }
  return {
    id,
  }
}
