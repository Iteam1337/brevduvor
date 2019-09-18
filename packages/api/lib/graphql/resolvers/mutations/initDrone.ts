import { MutationResolvers } from '../../../__generated__/brevduvor'
import { dronePost } from '../../../adapters/drone'

export const initDrone: MutationResolvers['initDrone'] = async (
  _,
  { start, stop }
) => {
  const { body } = await dronePost('/init', { start, stop })

  return body
}
