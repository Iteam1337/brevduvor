import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Coordinates {
    lat: Int
    lon: Int
  }

  type DronePositionResponse {
    start: Coordinates
    stop: Coordinates
    currentPos: Coordinates
    bearing: Int
    status: String
    batteryStatus: Int
    departure: String
    eta: String
  }
`
