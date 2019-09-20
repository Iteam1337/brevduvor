const { ApolloServer } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server-express')
const { getRoute } = require('./../index')
const { serverConfig, osrmInstance } = require('./../../../../../index')
const { query, mutate } = createTestClient(new ApolloServer(serverConfig))

// Mock api call
osrmInstance.getTrip = jest.fn(() => {
  return require('./getRouteFixture')
})

describe('getRoute', () => {
  it('exists', () => {
    expect(getRoute).toBeDefined()
  })

  it('returns a Route', async () => {
    const GET_ROUTE = gql`
      query($start: DestinationInput!, $stop: DestinationInput!) {
        getRoute(start: $start, stop: $stop) {
          trips {
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

    expect(res.data).toMatchSnapshot()
  })
})
