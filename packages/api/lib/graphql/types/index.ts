import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Mutation {
    initDrone(input: String): String
  }

  type Query {
    dummy: String
    allDestinations: [Destination!]!
  }

  type Destination {
    alias: String!,
    lat: Float!,
    lon: Float!
  }
`

export default [typeDefs]
