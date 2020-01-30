import { gql } from 'apollo-server-express'
import * as droneStatus from './droneStatus'
import * as destinations from './destinations'
import * as startDrone from './startDrone'
import * as initDrone from './initDrone'
import * as auth from './auth'
import * as notification from './notification'
import * as hasStartedNotification from './hasStartedNotification'

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

  type Mutation {
    initDrone(start: DestinationInput!, stop: DestinationInput!): String!

    startDrone(id: String!): StartDroneResponse! @isAuthenticated

    notification(input: NotificationInput!): Boolean! @isAuthenticated

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
    hasStarted: hasStartedResponse!
  }
`

export default [
  typeDefs,
  droneStatus.typeDefs,
  destinations.typeDefs,
  startDrone.typeDefs,
  initDrone.typeDefs,
  auth.typeDefs,
  notification.typeDefs,
  hasStartedNotification.typeDefs,
]
