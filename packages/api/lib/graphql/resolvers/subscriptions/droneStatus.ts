import { withFilter } from 'graphql-subscriptions'
import { SubscriptionResolvers } from '../../../__generated__/brevduvor'
import pubsub from '../../../adapters/pubsub'

export const droneStatus: SubscriptionResolvers['droneStatus'] = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(['droneStatus']),
    ({ droneStatus }, { id }) => droneStatus.id === id
  ),
}
