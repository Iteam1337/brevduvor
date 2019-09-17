import Scalars from './scalars'
import * as Mutation from './mutations'
import * as Subscription from './subscriptions'
import * as Query from './queries'

export default {
  ...Scalars,
  Mutation,
  Subscription,
  Query,
  Route: {
    trips: route => {
      return route.trips
    },
  },
  Trip: {
    distance: trip => {
      return trip.distance
    },
    geoJson: trip => {
      const geo = trip.geometry
      return {
        type: geo.type,
        coordinates: geo.coordinates || [],
      }
    },
  },
}
