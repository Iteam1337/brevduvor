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

import MenuIcons from '~/assets/MenuIcons'

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
            if (route.name === 'Hem') return <MenuIcons.Home active={focused} />
            if (route.name === 'Historik') {
              return <MenuIcons.History active={focused} />
            }
            if (route.name === 'Notifikationer') {
              return <MenuIcons.Notification active={focused} />
            }
            if (route.name === 'Inställningar')
              return <MenuIcons.Settings active={focused} />
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
