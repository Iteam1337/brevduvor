import { db, pgp } from '../adapters/postgres'
import dedent from 'dedent'

export type Status = 'initiating' | 'starting' | 'in progress' | 'done'
interface DroneTrip {
  drone_id: string
  allowed_spectators: [string?]
  finished: boolean
  status: Status
  start: string
  stop: string
}

export async function insertDroneTrip(droneTrip: DroneTrip) {
  const query = pgp.helpers.insert({ ...droneTrip }, undefined, 'drone_trips')

  return db.none(query)
}

export async function updateTripStatus(
  droneId: string,
  status: DroneTrip['status']
) {
  return db.none(
    dedent`
    UPDATE drone_trips
      SET status = $1
    WHERE drone_id = $2
  `,
    [status, droneId]
  )
}

export async function getActiveDrones(): Promise<any[]> {
  return db.manyOrNone(dedent`
    SELECT * FROM drone_trips WHERE status = 'in progress'
  `)
}
