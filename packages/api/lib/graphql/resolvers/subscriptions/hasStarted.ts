import { SubscriptionResolvers } from '../../../__generated__/brevduvor'
import pubsub from '../../../adapters/pubsub'

export const hasStarted: SubscriptionResolvers['hasStarted'] = {
  subscribe: () => pubsub.asyncIterator(['hasStarded']),
}
