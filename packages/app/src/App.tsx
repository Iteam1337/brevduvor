import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components/native'
import Home from '~/views/Home'
import theme from '~/styles/theme'
import client from '~/graphql/apolloClient'

import firebase from 'react-native-firebase'
import { AsyncStorage } from 'react-native'

const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  console.log(fcmToken)
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken()
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken)
    }
  }
}

const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission()

  if (enabled) {
    getToken()
  } else {
    requestPermission()
  }
}

const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission()
    getToken()
  } catch (error) {
    console.log('permission rejected')
  }
}

// const onSubscribeMessageListener = () =>
//   firebase.messaging().onMessage(msg => {
//     console.log({ msg })
//   })

const onSubscribeNotificationListener = firebase
  .notifications()
  .onNotification(notification => {
    firebase
      .notifications()
      .displayNotification(notification)
      .catch(err => {
        console.log({ err })
      })
  })

const notificationOpenedListener = firebase
  .notifications()
  .onNotificationOpened(notificationOpen => {
    // const { title, body } = notificationOpen.notification
    console.log({ notificationOpen })
  })

console.log(notificationOpenedListener)
const App = () => {
  React.useEffect(() => {
    console.log('subscribing')
    checkPermission()
    // onSubscribeNotificationListener()
    // onSubscribeMessageListener()
    // notificationOpenedListener()

    return () => {
      console.log('unsubscribing')
      onSubscribeNotificationListener()

      notificationOpenedListener()
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
