import { MutationResolvers, Status } from '../../../__generated__/brevduvor'
import { getBooking, createEvent } from '../../../services/bookings'
import { updateDrone, getDroneByBooking } from '../../../services/drones'
import { notifyDestinationSent } from '../../../services/notification'
import config from '../../../config'

export const startDrone: MutationResolvers['startDrone'] = async (
  _,
  { bookingId },
  { dataSources: { flyPulse } },
  _resolvers
) => {
  try {
    const booking = await getBooking(bookingId)
    await flyPulse.startDrone(config.DRONE) // TODO: Add support for fleet of drones

    await updateDrone({
      externalId: config.DRONE,
      status: 'in progress',
      bookingId,
    })

    await createEvent(bookingId, 'SENT' as Status)

    notifyDestinationSent(booking.destination, booking.id)

    return true
  } catch (err) {
    throw new Error(`Error in startDrone: ${err}`)
  }
}

export const landDrone: MutationResolvers['landDrone'] = async (
  _,
  { bookingId },
  { dataSources: { flyPulse } }
) => {
  try {
    const drone = await getDroneByBooking(bookingId)

    if (!drone) {
      return false
    }
    await flyPulse.landDrone(drone.external_id)
    return true
  } catch (err) {
    throw new Error(`Error in landDrone: ${err}`)
  }
}
