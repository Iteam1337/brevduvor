import { gql } from 'apollo-server-express'
import * as droneStatus from './droneStatus'
import * as destinations from './destinations'
import * as booking from './booking'
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

  type Drone {
    id: Int!
    status: String!
    description: String!
    name: String!
    active: Boolean!
  }

  type Mutation {
    initDrone(start: DestinationInput!, stop: DestinationInput!): String!

    booking(start: DestinationInput!, stop: DestinationInput!): String!
      @isAuthenticated

    notification(input: NotificationInput!): Boolean! @isAuthenticated

    login(email: String!, password: String!): AuthPayload!

    register(input: RegisterInput!): AuthPayload!

    startDrone(bookingId: String!): Boolean! @isAuthenticated

    updateUserLanguage(email: String! @isEmail, language: Languages!): Boolean!
      @isAuthenticated

    logout: LogoutResponse!
  }

  type Query {
    allDestinations: [Destination!]!
    getRoute(start: DestinationInput!, stop: DestinationInput!): Route!
      @isAuthenticated
    drones: [Drone!]!
    bookings: [Booking]
  }

  type Subscription {
    dronePosition(id: String!): InitDroneResponse! @isAuthenticated
    droneStatus(id: String!): DroneStatusResponse
    hasStarted: String!
  }
`

export default [
  typeDefs,
  droneStatus.typeDefs,
  destinations.typeDefs,
  initDrone.typeDefs,
  auth.typeDefs,
  notification.typeDefs,
  hasStartedNotification.typeDefs,
  booking.typeDefs,
]
