import { QueryResolvers } from '../../../__generated__/brevduvor'
import { getBookings } from '../../../services/bookings'

export const bookings: QueryResolvers['bookings'] = async (
  _,
  _args,
  { user }
) => {
  const bookings = await getBookings(user.destination)
  return bookings
}
