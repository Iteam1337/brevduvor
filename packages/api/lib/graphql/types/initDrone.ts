import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type InitDroneResponse {
    id: String!
    start: Coordinates!
    stop: Coordinates!
    status: String!
    # currentPos: Coordinates!
    # bearing: Int!
    # batteryStatus: Int!
    # departure: String!
    # eta: String!
  }
`
