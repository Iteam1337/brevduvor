import pubsub from '../adapters/pubsub'

export const droneStatus = async () => {
  pubsub.publish('droneStatus', { droneStatus })
}
