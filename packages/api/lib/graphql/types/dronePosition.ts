import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Coordinates {
    lat: Float!
    lon: Float!
  }

  type DronePositionResponse {
    id: String
    currentPos: Coordinates!
    bearing: Int
    status: String
    batteryStatus: Int
  }
`
