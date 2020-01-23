/**
 * @format
 */

import { AppRegistry } from 'react-native'
import React from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  getMainDefinition,
  split,
  HttpLink,
} from '@apollo/client'

import { WebSocketLink } from '@apollo/link-ws'
import { GRAPHQL_URI, GRAPHQL_WS_URI } from 'react-native-dotenv'
import { name as appName } from './app.json'
import App from './App'

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
})

const wsLink = new WebSocketLink({
  uri: GRAPHQL_WS_URI,
  options: {
    reconnect: true,
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

const Apollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => Apollo)
