import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './graphql/apolloClient'
import Home from './Home'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  )
}

export default App
