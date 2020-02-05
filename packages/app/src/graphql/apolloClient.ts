import {
  ApolloClient,
  InMemoryCache,
  getMainDefinition,
  split,
  HttpLink,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
// @ts-ignore
import { GRAPHQL_URI, GRAPHQL_WS_URI } from 'react-native-dotenv'

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

export default client
