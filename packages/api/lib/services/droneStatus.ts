import pubsub from '../adapters/pubsub'
import { saveDroneStatus } from './elastic'
import { DroneStatusResponse } from '../__generated__/brevduvor'
import { Response, NextFunction } from 'express'

export const droneStatus = (
  { body: droneStatus }: { body: DroneStatusResponse },
  res: Response,
  next: NextFunction
) => {
  saveDroneStatus(droneStatus)

  pubsub.publish('droneStatus', { droneStatus })

  res.send({ status: 'OK' })
  return next()
}
