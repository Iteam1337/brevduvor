import pubsub from '../adapters/pubsub'
import { saveDroneStatus } from './elastic'
import { DronePositionResponse } from '../__generated__/brevduvor'
import { Response, NextFunction } from 'express'

export const droneStatus = (
  { body: dronePosition }: { body: DronePositionResponse },
  res: Response,
  next: NextFunction
) => {
  saveDroneStatus(dronePosition)

  pubsub.publish('dronePosition', { dronePosition })

  res.send({ status: 'OK' })
  return next()
}
