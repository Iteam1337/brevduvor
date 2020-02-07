import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '~/views/Home'
import HomeIcon from '~/assets/HomeIcon'

const BottomMenu = createBottomTabNavigator()
const HomeStack = createStackNavigator()

const BookingNavigation = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  )
}
const NavigationBar = () => {
  return (
    <NavigationContainer>
      <BottomMenu.Navigator tabBarOptions={{ showLabel: false }}>
        <BottomMenu.Screen
          options={{ tabBarIcon: () => <HomeIcon /> }}
          name="home"
          component={BookingNavigation}
        />
      </BottomMenu.Navigator>
    </NavigationContainer>
  )
}

export default NavigationBar
