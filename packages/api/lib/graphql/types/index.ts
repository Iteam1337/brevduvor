import { gql } from 'apollo-server-express'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'
import * as dronePosition from './dronePosition'
import * as initDrone from './initiateDrone'
import * as destinations from './destinations'
import * as startDrone from './startDrone'

const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Geometry {
    type: String!
    coordinates: JSON
  }

  type Route {
    geoJson: Geometry
    distance: Float
  }

  type Mutation {
    initDrone(
      start: DestinationInput!
      stop: DestinationInput!
    ): InitDroneReponse!

    startDrone(id: String!): startDroneResponse!
  }

  type Query {
    allDestinations: [Destination!]!
    getRoute(start: DestinationInput!, stop: DestinationInput!): Route!
  }

  type Subscription {
    dronePosition(id: String!): DronePositionResponse
  }
`

export default [
  typeDefs,
  dronePosition.typeDefs,
  initDrone.typeDefs,
  destinations.typeDefs,
  startDrone.typeDefs,
]
