import pubsub from '../adapters/pubsub'
import { saveDroneStatus } from './elastic'

export const droneStatus = ({ body: dronePosition }, res, next) => {
  console.log(dronePosition)
  saveDroneStatus({
    position: dronePosition,
  })

  pubsub.publish('dronePosition', { dronePosition })

  res.send({ status: 'OK' })
  return next()
}
