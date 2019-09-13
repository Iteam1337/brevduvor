import { gql } from 'apollo-server-express'
import * as dronePosition from './dronePosition'

const typeDefs = gql`
  type Mutation {
    initDrone(input: String): String
  }

  type Query {
    dummy: String
    allDestinations: [Destination!]!
  }

  type Destination {
    alias: String!
    lat: Float!
    lon: Float!
  }

  type Subscription {
    dronePosition(id: String!): DronePositionResponse
  }
`

export default [typeDefs, dronePosition.typeDefs]
