import {
  ApolloClient,
  InMemoryCache,
  getMainDefinition,
  split,
  HttpLink,
  concat,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import { setContext } from '@apollo/link-context'
import AsyncStorage from '@react-native-community/async-storage'
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

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = split(
  ({ query }: { query: any }) => {
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
  link: concat(authLink, link),
})

export default client
