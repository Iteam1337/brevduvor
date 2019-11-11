import pubsub from '../adapters/pubsub'
import { saveDroneStatus } from './elastic'
import { DroneStatusResponse } from '../__generated__/brevduvor'
import { NextFunction, Response } from 'express'
import { updateTripStatus } from '../services/drones'
import * as notificationJob from './notificationJob'

export const droneStatus = async (
  { body: droneStatus }: { body: DroneStatusResponse },
  res: Response,
  next: NextFunction
) => {
  await saveDroneStatus(droneStatus)

  if (droneStatus.status === 'done') {
    await updateTripStatus(droneStatus.id, droneStatus.status)
    await notificationJob.create('sms', {
      receiver: '+46707905582',
      sentAt: new Date(Date.now()).toISOString(),
      sender: 'Storuman lasarett',
      message: 'The eagle has landed',
    })
  }

  pubsub.publish('droneStatus', { droneStatus })

  res.send({ status: 'OK' })
  return next()
}
