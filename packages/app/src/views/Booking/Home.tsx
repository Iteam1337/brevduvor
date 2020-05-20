import React from 'react'
import styled from 'styled-components/native'
import { useFocusEffect } from '@react-navigation/native'
import { useLazyQuery } from '@apollo/client'
import { GET_BOOKINGS } from '~/graphql/queries'

import { ScrollableLayout } from '~/components/Layout'
import ButtonWrapper from '~/components/ButtonWrapper'
import ContentWrapper from '~/components/ContentWrapper'
import BookingCard from '~/components/BookingCard'
import Title from '~/components/typography/Title'
import Paragraph from '~/components/typography/Paragraph'
import PrimaryButton from '~/components/Button'
import { UserContext } from '~/AppContext'

const backgroundImage = require('~/../assets/background-topo.png')

const InfoText = styled.View`
  height: 80%;
  align-self: center;
  justify-content: center;
  margin-bottom: 40px;
`
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
          (b: any) => b.events[b.events.length - 1].status !== 'DELIVERED'
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
        {bookings.length > 0 ? (
          <>
            <Title text="Mottagna" />
            {user &&
              bookings
                .filter((b: any) => b.stop.alias === user.destination.alias)
                .map((booking: any) => (
                  <BookingCard
                    key={booking.id}
                    callback={() =>
                      navigation.navigate('BookingInfo', { booking })
                    }
                    title={booking.start.alias}
                    events={booking.events}
                  />
                ))}
            <Title text="Skickade" />
            {user &&
              bookings
                .filter((b: any) => b.start.alias === user.destination.alias)
                .map((booking: any) => (
                  <BookingCard
                    key={booking.id}
                    callback={() =>
                      navigation.navigate('BookingInfo', { booking })
                    }
                    title={booking.stop.alias}
                    events={booking.events}
                  />
                ))}
          </>
        ) : (
          <InfoText>
            <Paragraph text="Du har just nu inga pågående transporter" />
          </InfoText>
        )}
      </ScrollableLayout>
      <ButtonWrapper>
        <PrimaryButton
          text="Ny Bokning"
          callback={() => navigation.navigate('Book')}
        />
      </ButtonWrapper>
    </ContentWrapper>
  )
}

export default Home
