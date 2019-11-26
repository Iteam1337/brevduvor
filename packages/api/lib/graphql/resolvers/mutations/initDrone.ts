import { MutationResolvers } from '../../../__generated__/brevduvor'
import { dronePost } from '../../../adapters/drone'
import { insertDroneTrip } from '../../../services/drones'

export const initDrone: MutationResolvers['initDrone'] = async (
  _,
  { start, stop },
  _ctx,
  _resolvers
) => {
  try {
    const { body } = await dronePost('/init', { start, stop })

    await insertDroneTrip({
      drone_id: body.id,
      status: 'initiating',
      start: `(${body.start.lat}, ${body.start.lon})`,
      stop: `(${body.stop.lat}, ${body.stop.lon})`,
      allowed_spectators: [],
      finished: false,
    })

    return body
  } catch (err) {
    throw new Error(`Error in initDrone: ${err}`)
  }
}
