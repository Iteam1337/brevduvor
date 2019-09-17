import { QueryResolvers } from '../../../__generated__/brevduvor'

export const getRoute: QueryResolvers['getRoute'] = async (
  _,
  { start, stop },
  { dataSources: { osrm } }
) => {
  try {
    const route = await osrm.getRoute(start, stop)
    return route
  } catch (error) {
    return error
  }
}
