import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '~/views/Home'
import HomeIcon from '~/assets/HomeIcon'
import Book from '~/views/Booking/Start'
import Eta from '~/views/Booking/Eta'
import Packing from '~/views/Booking/Packing'
import Send from '~/views/Booking/Send'

const BottomMenu = createBottomTabNavigator()
const HomeStack = createStackNavigator()

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Book" component={Book} />
      <HomeStack.Screen name="BookingEta" component={Eta} />
      <HomeStack.Screen name="BookingPacking" component={Packing} />
      <HomeStack.Screen name="Send" component={Send} />
    </HomeStack.Navigator>
  )
}

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <BottomMenu.Navigator>
        <BottomMenu.Screen
          options={{ tabBarIcon: () => <HomeIcon /> }}
          name="home"
          component={HomeNavigation}
        />
      </BottomMenu.Navigator>
    </NavigationContainer>
  )
}

export default NavigationBar
