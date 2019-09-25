import { QueryResolvers } from '../../../__generated__/brevduvor'
import { OSRMTripResponse } from '../../../datasources/osrm'

export const getRoute: QueryResolvers['getRoute'] = async (
  _,
  { start, stop },
  { dataSources: { osrm } }
) => {
  try {
    const route: OSRMTripResponse = await osrm.getTrip(start, stop)
    return route
  } catch (error) {
    return error
  }
}
