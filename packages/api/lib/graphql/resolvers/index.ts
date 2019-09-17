import Scalars from './scalars'
import * as Mutation from './mutations'
import * as Subscription from './subscriptions'
import * as Query from './queries'

import Route from './routeResolver'
import Trip from './tripResolver'

export default {
  ...Scalars,
  Mutation,
  Subscription,
  Query,
  Route,
  Trip,
}
