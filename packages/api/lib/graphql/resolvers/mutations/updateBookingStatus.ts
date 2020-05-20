import { MutationResolvers } from '../../../__generated__/brevduvor'
import { createEvent, getBooking } from '../../../services/bookings'
import { updateDrone } from '../../../services/drones'
import config from '../../../config'

export const updateBookingStatus: MutationResolvers['updateBookingStatus'] = async (
  _,
  { bookingId, status },
  { dataSources: { flyPulse } }
) => {
  try {
    const booking = await getBooking(bookingId)

    await flyPulse.loadBooking(config.DRONE, booking.flypulse_mission_id)
    await updateDrone({
      externalId: config.DRONE,
      status: 'loaded',
      bookingId,
    })

    await createEvent(bookingId, status)
    return true
  } catch (err) {
    throw new Error(`Error creating booking event: ${err}`)
  }
}
