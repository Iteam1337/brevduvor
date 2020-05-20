import { db } from '../adapters/postgres'
import dedent from 'dedent'
import pubsub from '../adapters/pubsub'
import config from '../config'

import WebSocket from 'ws'
import { notifyFinished, notifyReadyToLand } from './notification'
import { calculateDistance } from '../helpers/geo'
import { createEvent } from './bookings'

export type Status = 'loaded' | 'in progress' | 'ready to land' | 'done'

interface Drone {
  id: string
  external_id: string
  status?: Status
}

export async function updateDrone({
  externalId,
  status,
  bookingId,
}: {
  externalId: number
  status: Drone['status']
  bookingId: string
}) {
  return db.none(
    dedent`
    UPDATE drones
      SET status = '${status}',
      booking = '${bookingId}'
    WHERE external_id = '${externalId}'
  `
  )
}

export async function updateDroneStatus(
  status: Drone['status'],
  externalId: number
) {
  return db.none(
    dedent`
    UPDATE drones
      SET status = '${status}'
    WHERE external_id = '${externalId}'
  `
  )
}

// export async function getAvailableDrones(): Promise<any[]> {
//   return db.manyOrNone(dedent`
//     SELECT * FROM drones WHERE status <> 'in progress' and status <> 'loaded'
//   `)
// }

export async function getAllDrones(): Promise<any[]> {
  return db.manyOrNone(dedent`
    SELECT * FROM drones
  `)
}

async function getDroneByExternalId(externalId: number): Promise<any> {
  return db.oneOrNone(dedent`
    SELECT drones.*, b.*, d1.lat as dest_lat, d1.lon as dest_lon FROM drones LEFT JOIN bookings b ON drones.booking = b.id INNER JOIN destinations d1 ON b.destination = d1.id  WHERE drones.external_id = ${externalId}
  `)
}

export async function getDroneByBooking(bookingId: string): Promise<any> {
  return db.oneOrNone(`SELECT * from drones WHERE booking = '${bookingId}'`)
}

export async function startDroneListener() {
  const wss = new WebSocket(config.FLYPULSE.ws)
  const droneIds = (await getAllDrones()).map(d => d.external_id)

  wss.on('message', async message => {
    const data = JSON.parse(message as string)
    if (data.vehicle_id && droneIds.includes(data.vehicle_id)) {
      publishDroneInfo(data)
      if (data.armed && data.airspeed < 0.1) {
        const drone = await getDroneByExternalId(data.vehicle_id)
        const distance = calculateDistance(
          drone.dest_lat,
          drone.dest_lon,
          data.latitude,
          data.longitude
        )

        if (drone.status === 'in progress' && distance < 1) {
          updateDroneStatus('ready to land', data.vehicle_id)
          createEvent(drone.booking, 'READY_TO_LAND')
          notifyReadyToLand(drone.booking)
        }
      }
      // If not armed, drone has finished its mission and landed
      else if (data.armed === false) {
        const drone = await getDroneByExternalId(data.vehicle_id)

        if (!drone) return
        if (
          drone.status === 'ready to land' ||
          drone.status === 'in progress'
        ) {
          updateDroneStatus('done', data.vehicle_id)
          createEvent(drone.booking, 'DELIVERED')
          notifyFinished(drone.booking)
        }
      }
    }
  })
}

function publishDroneInfo(data: any) {
  pubsub.publish('droneInfo', {
    droneInfo: {
      id: data.vehicle_id.toString(),
      currentPos: {
        lat: data.latitude,
        lon: data.longitude,
      },
      batteryStatus: Math.round(data.battery_percentage * 100),
      armed: data.armed,
    },
  })
}
