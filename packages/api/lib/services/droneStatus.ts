import pubsub from '../adapters/pubsub'
import { saveDroneStatus } from './elastic'
import { DroneStatusResponse } from '../__generated__/brevduvor'
import { Response, NextFunction } from 'express'
import { updateTripStatus } from '../services/drones'

export const droneStatus = async (
  { body: droneStatus }: { body: DroneStatusResponse },
  res: Response,
  next: NextFunction
) => {
  saveDroneStatus(droneStatus)

  if (droneStatus.status === 'done') {
    await updateTripStatus(droneStatus.id, droneStatus.status)
  }

  pubsub.publish('droneStatus', { droneStatus })

  res.send({ status: 'OK' })
  return next()
}
