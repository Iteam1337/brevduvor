/**
 * @format
 */

import { AppRegistry } from 'react-native'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  getMainDefinition,
  split,
  HttpLink,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import App from './App'
import { name as appName } from './app.json'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
})

console.log('test')

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS_URI,
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

AppRegistry.registerComponent(appName, () => App)
