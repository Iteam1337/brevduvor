import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  enum BookingEvent {
    BOOKED
    PACKED
    SENT
    RECIPENT_NOTIFIED
  }

  type Booking {
    id: String!
    start: Destination!
    stop: Destination!
    eta: String!
    events: [String!]!
    status: String!
  }
`
