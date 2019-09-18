import { MutationResolvers } from '../../../__generated__/brevduvor'
import { dronePost } from '../../../adapters/drone'
import config from '../../../config'

export const startDrone: MutationResolvers['startDrone'] = async (
  _,
  { id }
) => {
  await dronePost('/start', { id, webhookUrl: config.WEBHOOK_URL })

  return {
    id,
  }
}
