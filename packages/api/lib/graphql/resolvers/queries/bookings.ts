import { QueryResolvers } from '../../../__generated__/brevduvor'
import { currentBookings } from '../../../services/addBooking'

export const bookings: QueryResolvers['bookings'] = _ => {
  return currentBookings
}
