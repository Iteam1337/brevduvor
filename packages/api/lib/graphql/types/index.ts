import { gql } from 'apollo-server-express'
import * as dronePosition from './dronePosition'
import * as initDrone from './initiateDrone'
import * as destinations from './destinations'
import * as startDrone from './startDrone'

const typeDefs = gql`
  type Mutation {
    initDrone(
      start: DestinationInput!
      stop: DestinationInput!
    ): InitDroneReponse!

    startDrone(id: String!): startDroneResponse!
  }

  type Query {
    allDestinations: [Destination!]!
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
