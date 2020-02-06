import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components/native'
import theme from '~/styles/theme'
import client from '~/graphql/apolloClient'
import NavigationBar from './components/NavigationBar'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <NavigationBar />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
