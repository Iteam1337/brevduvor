import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components/native'
import Home from '~/views/Home'
import theme from '~/styles/theme'
import client from '~/graphql/apolloClient'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
