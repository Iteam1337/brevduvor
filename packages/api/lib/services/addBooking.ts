import { Booking } from '../__generated__/brevduvor'

export const currentBookings: Booking[] = []

export function addBooking() {
  const booking = {
    id: '1',
    start: { alias: 'Storuman', lat: 65.090833, lon: 17.1075 },
    stop: { alias: 'Kvikkjokk', lat: 66.9501067, lon: 17.70861 },
    eta: '14:54',
    events: ['Bokad'],
    status: 'Väntar på bekräftelse',
  }

  return currentBookings.length
    ? currentBookings.shift()
    : currentBookings.push(booking)
}
