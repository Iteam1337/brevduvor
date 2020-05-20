import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import Login from '~/views/Login'
import NavigationBar from './NavigationBar'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext, UserContext } from '~/AppContext'
import { NavigationContainer } from '@react-navigation/native'
import { LOGIN, UPDATE_USER_DEVICES } from '../graphql/mutations'
import {
  Mutation,
  MutationLoginArgs,
  MutationUpdateUserDevicesArgs,
} from '../__generated__/app'
import { useMutation } from '@apollo/client'
import messaging from '@react-native-firebase/messaging'

const Stack = createStackNavigator()

const Auth = () => {
  const [loginMutation] = useMutation<
    { login: Mutation['login'] },
    MutationLoginArgs
  >(LOGIN, {
    onError: error => {
      console.log('error', error)
    },
  })

  const [updateUserDevicesMutation] = useMutation<
    { deviceId: Mutation['updateUserDevices'] },
    MutationUpdateUserDevicesArgs
  >(UPDATE_USER_DEVICES, {
    onError: error => {
      console.log('error', error)
    },
  })

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_LOGIN':
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
            isLoading: false,
          }
        case 'LOGIN':
          return {
            ...prevState,
            isLogout: false,
            user: action.user,
            userToken: action.token,
          }
        case 'LOGOUT':
          return {
            ...prevState,
            isLogout: true,
            user: null,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isLogout: false,
      user: null,
      userToken: null,
    }
  )

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken, user
      try {
        ;[userToken, user] = await AsyncStorage.multiGet(['token', 'user'])
      } catch (e) {
        // Restoring token failed
      }
      dispatch({
        type: 'RESTORE_LOGIN',
        token: (userToken && userToken[1]) || null,
        user: (user && user[1] && JSON.parse(user[1])) || null,
      })
    }

    bootstrapAsync()
  }, [])

  useEffect(() => {
    if (state.userToken) {
      messaging()
        .getToken()
        .then(notificationToken => {
          updateUserDevicesMutation({
            variables: {
              deviceId: notificationToken,
            },
          })
        })
    }
  }, [state.userToken, updateUserDevicesMutation])

  const authContext = {
    login: async (data: any) => {
      loginMutation({
        variables: {
          email: data.email,
          password: data.password,
        },
      })
        .then(async result => {
          if (!result.data) {
            return
          }

          const user = {
            username: result.data.login.username,
            destination: result.data.login.destination,
          }
          await AsyncStorage.multiSet([
            ['token', result.data.login.token],
            ['user', JSON.stringify(user)],
          ])
          dispatch({ type: 'LOGIN', token: result.data.login.token, user })
        })
        .catch(console.log)
    },
    logout: async () => {
      dispatch({ type: 'LOGOUT' })
      await AsyncStorage.multiRemove(['token', 'user'])
    },
  }

  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={{ user: state.user }}>
        <NavigationContainer>
          <Stack.Navigator headerMode={'none'}>
            {state.userToken == null ? (
              <Stack.Screen name="Login" component={Login.Home} />
            ) : (
              <Stack.Screen name="Home" component={NavigationBar} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}

export default Auth
