import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '~/views/Home'
import HomeIcon from '~/assets/HomeIcon'
import HistoryIcon from '~/assets/HistoryIcon'
import NotificationIcon from '~/assets/NotificationIcon'
import SettingsIcon from '~/assets/SettingsIcon'

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
          name="Hem"
          component={BookingNavigation}
        />
        <BottomMenu.Screen
          options={{ tabBarIcon: () => <HistoryIcon /> }}
          name="Historik"
          component={BookingNavigation}
        />
        <BottomMenu.Screen
          options={{ tabBarIcon: () => <NotificationIcon /> }}
          name="Notifikationer"
          component={BookingNavigation}
        />
        <BottomMenu.Screen
          options={{ tabBarIcon: () => <SettingsIcon /> }}
          name="Inställningar"
          component={BookingNavigation}
        />
      </BottomMenu.Navigator>
    </NavigationContainer>
  )
}

export default NavigationBar
