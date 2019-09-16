import { QueryResolvers } from '../../../__generated__/brevduvor'

export const getRoute: QueryResolvers['getRoute'] = async (
  _,
  { start, stop },
  { dataSources: { osrm } }
) => {
  const route = await osrm.getRoute(start, stop)
  return route
}
