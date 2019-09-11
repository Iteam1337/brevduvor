import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Mutation {
    initDrone(input: String): String
  }

  type Query {
    dummy: String
  }
`

export default [typeDefs]
