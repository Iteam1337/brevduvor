import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type InitDroneReponse {
    waypoints: [Coordinates]
    id: String
  }
`
