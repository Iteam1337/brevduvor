import { gql } from 'apollo-server-express'
import * as dronePosition from './dronePosition'
import * as destinations from './destinations'
import * as startDrone from './startDrone'
import * as initDrone from './initDrone'
import * as drones from './drones'

const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Geometry {
    type: String!
    coordinates: JSON!
  }

  type Route {
    trips: [Trip!]!
  }

  type Trip {
    geoJson: Geometry!
    distance: Float!
  }

  type Mutation {
    initDrone(
      start: DestinationInput!
      stop: DestinationInput!
    ): InitDroneResponse!

    startDrone(id: String!): StartDroneResponse!
  }

  type Query {
    allDestinations: [Destination!]!
    getRoute(start: DestinationInput!, stop: DestinationInput!): Route!
    drones: [DroneStatusResponse]!
  }

  type Subscription {
    dronePosition(id: String!): DroneStatusResponse
  }
`

export default [
  typeDefs,
  dronePosition.typeDefs,
  destinations.typeDefs,
  startDrone.typeDefs,
  initDrone.typeDefs,
  drones.typeDefs,
]
