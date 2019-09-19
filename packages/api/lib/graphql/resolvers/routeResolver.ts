import { OSRMTripResponse, OSRMTrip } from '../../datasources/osrm'

export default {
  trips: (route: OSRMTripResponse): Array<OSRMTrip> => {
    return route.trips
  },
}
