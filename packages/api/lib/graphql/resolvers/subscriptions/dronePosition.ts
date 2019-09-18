import { withFilter } from 'graphql-subscriptions'
import { SubscriptionResolvers } from '../../../__generated__/brevduvor'
import pubsub from '../../../adapters/pubsub'

export const dronePosition: SubscriptionResolvers['dronePosition'] = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(['dronePosition']),
    ({ dronePosition }, { id }) => dronePosition.id === id
  ),
}
