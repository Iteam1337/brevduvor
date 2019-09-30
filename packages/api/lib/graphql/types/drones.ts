import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type DroneStatusResponse {
    id: String!
    start: Coordinates!
    stop: Coordinates!
    currentPos: Coordinates!
    bearing: Int!
    status: String!
    batteryStatus: Int!
    departure: String!
    eta: String!
  }
`
