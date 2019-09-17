import pubsub from '../adapters/pubsub'

export const droneStatus = ({ body: dronePosition }, res, next) => {
  pubsub.publish('dronePosition', { dronePosition })
  res.sendStatus(200)
  return next()
}
