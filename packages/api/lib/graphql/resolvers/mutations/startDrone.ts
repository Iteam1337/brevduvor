import { MutationResolvers } from '../../../__generated__/brevduvor'
import { dronePost } from '../../../adapters/drone'
import { updateTripStatus } from '../../../services/drones'
import config from '../../../config'
import got = require('got')
import pubsub from '../../../adapters/pubsub'

export const startDrone: MutationResolvers['startDrone'] = async (
  _,
  { id },
  _ctx,
  _resolvers
) => {
  try {
    await dronePost('/start', { id, webhookUrl: config.WEBHOOK_URL })
    await updateTripStatus(id, 'in progress')

    setTimeout(() => getDroneStatus(id), 1000)
  } catch (err) {
    throw new Error(`Error in startDrone: ${err}`)
  }
  return {
    id,
  }
}

const getDroneStatus = async (id: string) => {
  const { body: gpsData } = await got(`${config.DRONE_URL}/gps_data`, {
    json: true,
  })

  const droneStatus = {
    currentPos: gpsData.currentPos,
    id: id,
    start: gpsData.start,
    stop: gpsData.stop,
    bearing: 2,
    status: '',
    batteryStatus: 100,
    departure: '',
    eta: '',
  }

  pubsub.publish('droneStatus', { droneStatus })
  setTimeout(() => getDroneStatus(id), 1000)
}
