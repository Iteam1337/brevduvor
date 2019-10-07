import { MutationResolvers } from '../../../__generated__/brevduvor'
import { dronePost } from '../../../adapters/drone'
import { insertDroneTrip, Status } from '../../../services/drones'

export const initDrone: MutationResolvers['initDrone'] = async (
  _,
  { start, stop }
) => {
  const { body } = await dronePost('/init', { start, stop })

  await insertDroneTrip({
    drone_id: body.id,
    status: 'initating' as Status,
    start: `(${body.start.lat}, ${body.start.lon})`,
    stop: `(${body.stop.lat}, ${body.stop.lon})`,
    allowed_spectators: [],
    finished: false,
  })

  return body
}
