export {} // TypeScript diagnostics
const { ApolloServer } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server-express')
const { allDestinations } = require('../index')
const { serverConfig } = require('../../../../../index')
const { query } = createTestClient(
  new ApolloServer({
    typeDefs: serverConfig.typeDefs,
    schemaDirectives: serverConfig.schemaDirectives,
    resolvers: serverConfig.resolvers,
  })
)

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
