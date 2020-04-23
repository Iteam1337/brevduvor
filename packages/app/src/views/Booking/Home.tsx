import React from 'react'
import styled from 'styled-components/native'
import { useFocusEffect } from '@react-navigation/native'
import { useLazyQuery } from '@apollo/client'
import { GET_BOOKINGS } from '~/graphql/queries'

import ScrollableLayout from '~/components/ScrollableLayout'
import ButtonWrapper from '~/components/ButtonWrapper'
import ContentWrapper from '~/components/ContentWrapper'
import BookingCard from '~/components/BookingCard'
import Title from '~/components/typography/Title'
import Paragraph from '~/components/typography/Paragraph'
import PrimaryButton from '~/components/Button'

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
  const [bookings, setBookings] = React.useState({ bookings: [] })
  const [getBooking] = useLazyQuery(GET_BOOKINGS, {
    onCompleted: res => setBookings(res),
    fetchPolicy: 'network-only',
  })

  useFocusEffect(
    React.useCallback(() => {
      getBooking()
    }, [getBooking])
  )

  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        {bookings && bookings.bookings.length > 0 && (
          <>
            <Title text="Aktuella bokningar" />
            <Paragraph
              toLeft={true}
              small={true}
              text="Klicka på en transport för mer information"
            />
          </>
        )}
        {bookings && bookings.bookings.length > 0 ? (
          bookings.bookings.map((booking: any) => (
            <BookingCard
              callback={() =>
                navigation.navigate('BookingInfo', { booking: booking })
              }
              booking={booking}
            />
          ))
        ) : (
          <InfoText>
            <Paragraph text="Du har just nu inga pågående transporter" />
          </InfoText>
        )}
      </ContentWrapper>
      <ButtonWrapper>
        <PrimaryButton
          text="Ny Bokning"
          callback={() => navigation.navigate('Book')}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default Home
