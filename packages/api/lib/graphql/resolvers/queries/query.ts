export const getRoute = async (
  _,
  { start, stop },
  { dataSources: { osrm } }
) => {
  const route = await osrm.getRoute(start, stop)
  console.log(route)
  return route
}
