import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components/native'
import client from '~/graphql/apolloClient'
import Home from '~/views/Home'
import theme from '~/styles/theme'

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
