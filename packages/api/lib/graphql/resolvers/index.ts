import * as Mutation from './mutations'
import * as Subscription from './subscriptions'
import * as Query from './queries'

export default {
  Mutation,
  Subscription,
  Query,
  Route: {
    geoJson: route => {
      console.log(route.trips[0].geometry)
      const geo = route.trips[0].geometry
      return {
        type: geo.type,
        coordinates: JSON.stringify(geo.coordinates),
      }
    },
  },
}
