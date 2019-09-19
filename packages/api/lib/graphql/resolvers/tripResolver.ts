import { OSRMTrip } from '../../datasources/osrm'
import { Geometry, Scalars } from '../../__generated__/brevduvor'

export default {
  distance: (trip: OSRMTrip): Scalars['Float'] => {
    return trip.distance
  },
  geoJson: (trip: OSRMTrip): Geometry => {
    const geo = trip.geometry
    return {
      type: geo.type,
      coordinates: geo.coordinates || [],
    }
  },
}
