import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import BookingViews from '~/views/Booking'
import HistoryViews from '~/views/History'
import NotificationViews from '~/views/Notifications'
import SettingViews from '~/views/Settings'

import HomeIcon from '~/assets/HomeIcon'
import HistoryIcon from '~/assets/HistoryIcon'
import NotificationIcon from '~/assets/NotificationIcon'
import SettingsIcon from '~/assets/SettingsIcon'

const BottomMenu = createBottomTabNavigator()
const BookingStack = createStackNavigator()
const SettingsStack = createStackNavigator()
const HistoryStack = createStackNavigator()
const NotificationsStack = createStackNavigator()

const BookingNavigation = () => {
  return (
    <BookingStack.Navigator headerMode="none">
      <BookingStack.Screen name="Home" component={BookingViews.Home} />
      <BookingStack.Screen name="Book" component={BookingViews.Start} />
      <BookingStack.Screen name="BookingEta" component={BookingViews.Eta} />
      <BookingStack.Screen
        name="BookingPacking"
        component={BookingViews.Packing}
      />
      <BookingStack.Screen name="BookingSend" component={BookingViews.Send} />
      <BookingStack.Screen
        name="BookingConfirmation"
        component={BookingViews.Confirmation}
      />
      <BookingStack.Screen name="BookingInfo" component={BookingViews.Info} />
    </BookingStack.Navigator>
  )
}

const NotificationsNavigation = () => {
  return (
    <NotificationsStack.Navigator headerMode="none">
      <NotificationsStack.Screen
        name="Home"
        component={NotificationViews.Home}
      />
    </NotificationsStack.Navigator>
  )
}

const SettingsNavigation = () => {
  return (
    <SettingsStack.Navigator headerMode="none">
      <SettingsStack.Screen name="Home" component={SettingViews.Home} />
    </SettingsStack.Navigator>
  )
}

const HistoryNavigation = () => {
  return (
    <HistoryStack.Navigator headerMode="none">
      <HistoryStack.Screen name="Home" component={HistoryViews.Home} />
    </HistoryStack.Navigator>
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
        <BottomMenu.Screen name="Historik" component={HistoryNavigation} />
        <BottomMenu.Screen
          name="Notifikationer"
          component={NotificationsNavigation}
        />
        <BottomMenu.Screen
          name="Inställningar"
          component={SettingsNavigation}
        />
      </BottomMenu.Navigator>
    </NavigationContainer>
  )
}

export default NavigationBar
