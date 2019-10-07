import { gql } from 'apollo-server-express'
import * as droneStatus from './droneStatus'
import * as destinations from './destinations'
import * as startDrone from './startDrone'
import * as initDrone from './initDrone'

const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Geometry {
    type: String!
    coordinates: JSON!
  }

  type Coordinates {
    lat: Float!
    lon: Float!
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
    drones: [String]!
  }

  type Subscription {
    droneStatus(id: String!): DroneStatusResponse
  }
`

export default [
  typeDefs,
  droneStatus.typeDefs,
  destinations.typeDefs,
  startDrone.typeDefs,
  initDrone.typeDefs,
]
