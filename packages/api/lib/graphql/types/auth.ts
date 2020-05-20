import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type AuthPayload {
    id: ID!
    token: String!
    email: String!
    username: String!
    language: Languages
    destination: Destination
  }

  type LogoutResponse {
    status: String!
    message: String!
  }

  input RegisterInput {
    email: String! @isEmail
    username: String!
    password: String!
    confirmPassword: String!
  }
`
