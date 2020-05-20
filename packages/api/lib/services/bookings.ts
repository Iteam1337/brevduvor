import { db } from '../adapters/postgres'

export function addBooking(
  departure: string,
  destination: string,
  missionId: number
): Promise<{ id: string }> {
  return db.one(
    `INSERT INTO bookings (departure, destination, flypulse_mission_id, events) VALUES ('${departure}', '${destination}', ${missionId}, '[{ "status": "CREATED", "created_at": "${new Date().toISOString()}"}]') RETURNING id`
  )
}

export function getBooking(id: string): Promise<any> {
  return db.one(`SELECT * FROM bookings WHERE id = '${id}'`)
}

export function getBookings(location: string | null): Promise<any> {
  return db.map(
    `SELECT json_build_object(
      'id', b.id,
      'flypulse_mission_id', b.flypulse_mission_id,
      'created_at', b.created_at,
      'stop', json_build_object(
        'alias', destination.alias,
        'lon', destination.lon,
        'lat', destination.lat
      ),
      'start', json_build_object(
        'alias', departure.alias,
        'lon', departure.lon,
        'lat', departure.lat
      ),
      'events', b.events) json
    FROM bookings b
      LEFT JOIN destinations AS destination ON destination.id = b.destination
      LEFT JOIN destinations AS departure ON departure.id = b.departure
      ${location !== null &&
        `WHERE b.departure = '${location}' OR b.destination = '${location}'`}
      `,
    [],
    b => b.json
  )
}

export function createEvent(bookingId: string, status: string): Promise<any> {
  return db.none(
    `UPDATE bookings SET events = events || '[{ "status": "${status}", "created_at": "${new Date().toISOString()}"}]' WHERE bookings.id = '${bookingId}'`
  )
}
