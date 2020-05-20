import { gql } from 'apollo-server-express'
import * as destinations from './destinations'
import * as booking from './booking'
import * as droneInfo from './droneInfo'
import * as auth from './auth'

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
    booking(start: DestinationInput!, stop: DestinationInput!): String!
      @isAuthenticated

    updateBookingStatus(bookingId: String!, status: Status!): Boolean!
      @isAuthenticated

    login(email: String!, password: String!): AuthPayload!

    register(input: RegisterInput!): AuthPayload!

    startDrone(bookingId: String!): Boolean! @isAuthenticated

    landDrone(bookingId: String!): Boolean! @isAuthenticated

    updateUserLanguage(email: String! @isEmail, language: Languages!): Boolean!
      @isAuthenticated

    updateUserDevices(deviceId: String!): Boolean! @isAuthenticated

    logout: LogoutResponse!
  }

  type Query {
    allDestinations: [Destination!]!
    drones: [Drone!]!
    bookings: [Booking] @isAuthenticated
  }

  type Subscription {
    droneInfo(id: String!): DroneInfoResponse!
  }
`

export default [
  typeDefs,
  destinations.typeDefs,
  droneInfo.typeDefs,
  auth.typeDefs,
  booking.typeDefs,
]
