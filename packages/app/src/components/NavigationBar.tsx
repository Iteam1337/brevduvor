import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '~/views/Home'
import Book from '~/views/Booking/Start'
import Eta from '~/views/Booking/Eta'
import Packing from '~/views/Booking/Packing'
import Send from '~/views/Booking/Send'
import Confirmation from '~/views/Booking/Confirmation'

import HomeIcon from '~/assets/HomeIcon'
import HistoryIcon from '~/assets/HistoryIcon'
import NotificationIcon from '~/assets/NotificationIcon'
import SettingsIcon from '~/assets/SettingsIcon'

const BottomMenu = createBottomTabNavigator()
const HomeStack = createStackNavigator()

const BookingNavigation = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Book" component={Book} />
      <HomeStack.Screen name="BookingEta" component={Eta} />
      <HomeStack.Screen name="BookingPacking" component={Packing} />
      <HomeStack.Screen name="BookingSend" component={Send} />
      <HomeStack.Screen name="BookingConfirmation" component={Confirmation} />
    </HomeStack.Navigator>
  )
}

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <BottomMenu.Navigator
        tabBarOptions={{ showLabel: false }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let active = focused ? 1 : 0.4

            if (route.name === 'Hem') return <HomeIcon active={active} />
            if (route.name === 'Historik') {
              return <HistoryIcon active={active} />
            }
            if (route.name === 'Notifikationer') {
              return <NotificationIcon active={active} />
            }
            if (route.name === 'Inställningar')
              return <SettingsIcon active={active} />
          },
        })}
      >
        <BottomMenu.Screen name="Hem" component={BookingNavigation} />
        <BottomMenu.Screen name="Historik" component={BookingNavigation} />
        <BottomMenu.Screen
          name="Notifikationer"
          component={BookingNavigation}
        />
        <BottomMenu.Screen name="Inställningar" component={BookingNavigation} />
      </BottomMenu.Navigator>
    </NavigationContainer>
  )
}

export default NavigationBar
