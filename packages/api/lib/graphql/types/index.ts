import { gql } from 'apollo-server-express'
import * as droneStatus from './droneStatus'
import * as destinations from './destinations'
import * as startDrone from './startDrone'
import * as initDrone from './initDrone'

import { directiveTypeDefs } from './../directives/rules'

const typeDefs = gql`
  ${directiveTypeDefs}

  directive @isAuthenticated on FIELD_DEFINITION

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

  type AuthPayload {
    id: ID!
    token: String!
    username: String!
  }

  type LogoutResponse {
    status: String!
    message: String!
  }

  input RegisterInput {
    username: String! @maxLength(length: 255)
    password: String!
    confirmPassword: String!
  }

  type Mutation {
    initDrone(
      start: DestinationInput!
      stop: DestinationInput!
    ): InitDroneResponse! @isAuthenticated

    startDrone(id: String!): StartDroneResponse! @isAuthenticated

    login(
      username: String! @minLength(length: 12) @isEmail
      password: String!
    ): AuthPayload!

    register(input: RegisterInput!): AuthPayload!

    logout: LogoutResponse!
  }

  type Query {
    allDestinations: [Destination!]! @isAuthenticated
    getRoute(start: DestinationInput!, stop: DestinationInput!): Route!
      @isAuthenticated
    drones: [String!]!
  }

  type Subscription {
    dronePosition(id: String!): InitDroneResponse! @isAuthenticated
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
