import { Booking } from '../__generated__/brevduvor'
import { db } from '../adapters/postgres'

export const currentBookings: Booking[] = []

export function addBooking(
  departure: string,
  destination: string,
  missionId: number
): Promise<{ id: string }> {
  return db.one(
    `INSERT INTO bookings (departure, destination, flypulse_mission_id) VALUES ('${departure}', '${destination}', ${missionId}) RETURNING id`
  )
}

export function getBooking(id: string): Promise<any> {
  return db.one(`SELECT * FROM bookings WHERE id = '${id}'`)
}
