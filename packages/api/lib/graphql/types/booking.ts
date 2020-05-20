import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  enum Status {
    CREATED
    BOOKED
    PACKED
    SENT
    READY_TO_LAND
    RECIPENT_NOTIFIED
    DELIVERED
  }

  type BookingEvent {
    status: Status
    created_at: String
  }

  input BookingInput {
    start: DestinationInput!
    stop: DestinationInput!
  }

  type Booking {
    id: String!
    start: Destination!
    stop: Destination!
    eta: String!
    events: [BookingEvent]!
  }
`
