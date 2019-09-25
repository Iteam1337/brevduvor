import { QueryResolvers } from '../../../__generated__/brevduvor'
import { OSRMTripResponse } from '../../../datasources/osrm'
import { AuthenticationError } from 'apollo-server-core'

export const getRoute: QueryResolvers['getRoute'] = async (
  _,
  { start, stop },
  { dataSources: { osrm }, user }
) => {
  try {
    if (user) {
      const route: OSRMTripResponse = await osrm.getTrip(start, stop)
      return route
    }
    return new AuthenticationError('Not authorized')
  } catch (error) {
    return error
  }
}
