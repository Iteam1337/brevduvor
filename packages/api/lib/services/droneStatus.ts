import pubsub from '../adapters/pubsub'
import { saveDroneStatus } from './elastic'

export const droneStatus = ({ body: dronePosition }, res, next) => {
  saveDroneStatus({
    position: dronePosition,
  })

  pubsub.publish('dronePosition', { dronePosition })
  res.sendStatus(200)
  return next()
}