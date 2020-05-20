import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type DroneInfoResponse {
    id: String!
    start: Coordinates!
    stop: Coordinates!
    currentPos: Coordinates!
    bearing: Int!
    status: String!
    batteryStatus: Int!
    departure: String!
    eta: String!
    armed: Boolean!
  }
`
