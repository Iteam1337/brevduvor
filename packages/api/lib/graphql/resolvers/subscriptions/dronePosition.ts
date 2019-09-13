import { SubscriptionResolvers } from '../../../__generated__/brevduvor'
import pubsub from '../../../adapters/pubsub'

export const dronePosition: SubscriptionResolvers['dronePosition'] = {
  subscribe: () => pubsub.asyncIterator(['dronePosition']),
}
