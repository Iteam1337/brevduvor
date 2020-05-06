import { MutationResolvers } from '../../../__generated__/brevduvor'
// import { dronePost } from '../../../adapters/drone'
import { getBooking } from '../../../services/bookings'
// import { insertDroneTrip } from '../../../services/drones'

const DRONE_ID = 13

export const startDrone: MutationResolvers['startDrone'] = async (
  _,
  { bookingId },
  // _ctx,
  { dataSources: { flyPulse } },
  _resolvers
) => {
  try {
    const booking = await getBooking(bookingId)
    await flyPulse.loadBooking(DRONE_ID, booking.flypulse_mission_id)

    await flyPulse.startDrone(DRONE_ID)

    return true
  } catch (err) {
    throw new Error(`Error in startDrone: ${err}`)
  }
}
