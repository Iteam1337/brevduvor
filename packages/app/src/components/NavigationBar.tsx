import React from 'react'
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

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{ showLabel: false }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const active = focused ? 1 : 0.4

          if (route.name === 'Bookings') return <HomeIcon active={active} />
          if (route.name === 'History') {
            return <HistoryIcon active={active} />
          }
          if (route.name === 'Notifications') {
            return <NotificationIcon active={active} />
          }
          if (route.name === 'Settings') return <SettingsIcon active={active} />
        },
      })}
    >
      <Tab.Screen name="Bookings" component={BookingsStack} />
      <Tab.Screen name="History" component={HistoryViews.Home} />
      <Tab.Screen name="Notifications" component={NotificationViews.Home} />
      <Tab.Screen name="Settings" component={SettingViews.Home} />
    </Tab.Navigator>
  )
}

const BookingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ECF5FF',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontFamily: 'NunitoSans-Bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={BookingViews.Home}
        options={{ headerTitle: 'Bokningar', headerShown: true }}
      />
      <Stack.Screen
        name="Book"
        component={BookingViews.Start}
        options={{ headerTitle: 'Boka transport' }}
      />
      <Stack.Screen
        name="BookingEta"
        component={BookingViews.Eta}
        options={{ headerTitle: 'ETA' }}
      />
      <Stack.Screen
        name="BookingPacking"
        component={BookingViews.Packing}
        options={{ headerTitle: 'Packa' }}
      />
      <Stack.Screen
        name="BookingSend"
        component={BookingViews.Send}
        options={{ headerTitle: 'Skicka' }}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingViews.Confirmation}
        options={{ headerTitle: 'Bokningsbekräftelse' }}
      />
      <Stack.Screen
        name="BookingInfo"
        component={BookingViews.Info}
        options={{
          headerTitle: 'Bokningsinformation',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}

export default TabNavigator
