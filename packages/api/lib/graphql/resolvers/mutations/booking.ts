import { MutationResolvers } from '../../../__generated__/brevduvor'
import { getDestinationFromAlias } from '../../../services/destinations'
import { addBooking } from '../../../services/bookings'
import { notifyDestinationNew } from '../../../services/notification'

export const booking: MutationResolvers['booking'] = async (
  _,
  { start, stop },
  { dataSources: { flyPulse } },
  _resolvers
) => {
  try {
    const departure = await getDestinationFromAlias(start.alias)
    const destination = await getDestinationFromAlias(stop.alias)

    const {
      mission: { id: flypulseMissionId },
    } = await flyPulse.createMission(departure, destination)

    const { id } = await addBooking(
      departure.id,
      destination.id,
      flypulseMissionId
    )

    notifyDestinationNew(destination.id, id)

    return id
  } catch (err) {
    throw new Error(`Error in bookings: ${err}`)
  }
}
