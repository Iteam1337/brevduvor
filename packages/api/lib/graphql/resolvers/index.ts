import * as Mutation from './mutations'
import * as Subscription from './subscriptions'
import * as Query from './queries'

export default {
  Mutation,
  Subscription,
  Query,
  Route: {
    distance: route => {
      return route.trips[0].distance
    },
    geoJson: route => {
      const geo = route.trips[0].geometry
      return {
        type: geo.type,
        coordinates: geo.coordinates || [],
      }
    },
  },
}
