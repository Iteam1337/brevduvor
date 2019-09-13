import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type startDroneResponse {
    id: String!
    status: String!
  }
`
