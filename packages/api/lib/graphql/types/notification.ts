import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input NotificationInput {
    sender: String!
    receiver: String!
    sentAt: String!
    message: String!
  }
`
