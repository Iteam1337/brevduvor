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

  enum Languages {
    ENGLISH
    SWEDISH
  }

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
    email: String!
    username: String!
    language: Languages
  }

  type LogoutResponse {
    status: String!
    message: String!
  }

  input RegisterInput {
    email: String! @isEmail
    username: String!
    password: String!
    confirmPassword: String!
  }

  type Mutation {
    initDrone(
      start: DestinationInput!
      stop: DestinationInput!
    ): InitDroneResponse! @isAuthenticated

    startDrone(id: String!): StartDroneResponse! @isAuthenticated

    login(email: String!, password: String!): AuthPayload!

    register(input: RegisterInput!): AuthPayload!

    updateUserLanguage(email: String! @isEmail, language: Languages!): Boolean!
      @isAuthenticated

    logout: LogoutResponse!
  }

  type Query {
    allDestinations: [Destination!]!
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
