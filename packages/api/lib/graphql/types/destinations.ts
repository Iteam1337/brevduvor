import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Destination {
    alias: String!
    lat: Float!
    lon: Float!
  }

  input DestinationInput {
    alias: String!
  }
`
