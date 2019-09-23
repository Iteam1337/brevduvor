const { ApolloServer } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server-express')
const { getRoute } = require('./../index')
const { serverConfig, osrmInstance } = require('./../../../../../index')
const { query } = createTestClient(new ApolloServer(serverConfig))

// Mock api call
osrmInstance.getTrip = jest.fn(() => {
  return require('./getRouteFixture')
})

describe('getRoute', () => {
  it('exists', () => {
    expect(getRoute).toBeDefined()
  })

  /** integration test? */
  it('fetches a Route with list of coordinates', async () => {
    const GET_ROUTE = gql`
      query($start: DestinationInput!, $stop: DestinationInput!) {
        getRoute(start: $start, stop: $stop) {
          trips {
            geoJson {
              coordinates
            }
          }
        }
      }
    `

    const res = await query({
      query: GET_ROUTE,
      variables: {
        start: { alias: 'Storuman', lat: 65.090833, lon: 17.1075 },
        stop: { alias: 'Slussfors', lat: 65.4308046, lon: 16.2481741 },
      },
    })

    expect(res.data).toMatchSnapshot()
  })

  it('has fields as advertised in schema', async () => {
    const GET_ROUTE = gql`
      query($start: DestinationInput!, $stop: DestinationInput!) {
        getRoute(start: $start, stop: $stop) {
          trips {
            distance
            geoJson {
              coordinates
              type
            }
          }
        }
      }
    `

    const res = await query({
      query: GET_ROUTE,
      variables: {
        start: { alias: 'Storuman', lat: 65.090833, lon: 17.1075 },
        stop: { alias: 'Slussfors', lat: 65.4308046, lon: 16.2481741 },
      },
    })

    expect(res.data.getRoute).toHaveProperty('trips')
    expect(res.data.getRoute.trips[0]).toHaveProperty('distance')
    expect(res.data.getRoute.trips[0]).toHaveProperty('geoJson')
    expect(res.data.getRoute.trips[0]).toHaveProperty('geoJson.coordinates')
  })
})
