import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useLazyQuery } from '@apollo/client'
import { GET_BOOKINGS } from '~/graphql/queries'

import { ScrollableLayout } from '~/components/Layout'
import ContentWrapper from '~/components/ContentWrapper'
import BookingCard from '~/components/BookingCard'
import Title from '~/components/typography/Title'
import { UserContext } from '~/AppContext'

const backgroundImage = require('~/../assets/background-topo.png')

interface HomeProps {
  navigation: any
  center?: boolean
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [bookings, setBookings] = React.useState([])
  const { user } = React.useContext<any>(UserContext)
  const [getBookings] = useLazyQuery(GET_BOOKINGS, {
    onCompleted: res => {
      setBookings(
        res.bookings.filter(
          (b: any) => b.events[b.events.length - 1].status === 'DELIVERED'
        )
      )
    },
    onError: console.error,
    fetchPolicy: 'network-only',
  })

  useFocusEffect(
    React.useCallback(() => {
      getBookings()
    }, [getBookings])
  )

  return (
    <ContentWrapper>
      <ScrollableLayout image={backgroundImage}>
        {bookings.length > 0 && (
          <>
            <Title text="Mottagna" />
            {user &&
              bookings.map(
                (booking: any) =>
                  booking.stop.alias === user.destination.alias && (
                    <BookingCard
                      key={booking.id}
                      callback={() =>
                        navigation.navigate('BookingInfo', { booking })
                      }
                      title={booking.start.alias}
                      events={booking.events}
                    />
                  )
              )}
            <Title text="Skickade" />
            {user &&
              bookings.map(
                (booking: any) =>
                  booking.start.alias === user.destination.alias && (
                    <BookingCard
                      key={booking.id}
                      callback={() =>
                        navigation.navigate('BookingInfo', { booking })
                      }
                      title={booking.stop.alias}
                      events={booking.events}
                    />
                  )
              )}
          </>
        )}
      </ScrollableLayout>
    </ContentWrapper>
  )
}

export default Home
