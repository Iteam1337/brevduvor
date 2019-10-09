import { gql } from 'apollo-server-express'
import * as dronePosition from './dronePosition'
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

  type Route {
    trips: [Trip!]!
  }

  type Trip {
    geoJson: Geometry!
    distance: Float!
  }

  type AuthPayload {
    id: ID!
    token: String
    username: String
  }

  type LogoutResponse {
    status: String!
    message: String!
  }

  input RegisterInput {
    username: String! @maxLength(length: 255) @isEmail
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
      username: String! @maxLength(length: 255) @isEmail
      password: String!
    ): AuthPayload!

    register(input: RegisterInput!): AuthPayload!

    logout: LogoutResponse!
  }

  type Query {
    allDestinations: [Destination!]!
    getRoute(start: DestinationInput!, stop: DestinationInput!): Route!
      @isAuthenticated
  }

  type Subscription {
    dronePosition(id: String!): InitDroneResponse! @isAuthenticated
  }
`

export default [
  typeDefs,
  dronePosition.typeDefs,
  destinations.typeDefs,
  startDrone.typeDefs,
  initDrone.typeDefs,
]
