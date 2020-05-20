import { withFilter } from 'graphql-subscriptions'

import { SubscriptionResolvers } from '../../../__generated__/brevduvor'
import pubsub from '../../../adapters/pubsub'

export const droneInfo: SubscriptionResolvers['droneInfo'] = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(['droneInfo']),
    ({ droneInfo }, { id }) => droneInfo.id === id
  ),
}
