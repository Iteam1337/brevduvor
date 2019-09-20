const { ApolloServer } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server-express')
const { allDestinations } = require('./../index')
const { serverConfig, osrmInstance } = require('./../../../../../index')
const { query } = createTestClient(new ApolloServer(serverConfig))

describe('allDestinations', () => {
  it('exists', () => {
    expect(allDestinations).toBeDefined()
  })

  it('matches snapshot', async () => {
    const ALL_DEST = gql`
      query {
        allDestinations {
          alias
          lat
          lon
        }
      }
    `

    const res = await query({ query: ALL_DEST })

    expect(res.data).toMatchSnapshot()
  })
})
