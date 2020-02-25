import React from 'react'
import PrimaryButton from '~/components/Button'
import Paragraph from '~/components/typography/Paragraph'
import Heading from '~/components/typography/Heading'
import styled from 'styled-components/native'
import ScrollableLayout from '~/components/ScrollableLayout'
import ButtonWrapper from '~/components/ButtonWrapper'
import ContentWrapper from '~/components/ContentWrapper'
import { useLazyQuery } from '@apollo/client'
import { GET_BOOKINGS } from '~/graphql/queries'
import BookingCard from '~/components/BookingCard'
import { useFocusEffect } from '@react-navigation/native'

const backgroundImage = require('~/../assets/background-topo.png')

const InfoText = styled.View<{ center: HomeProps['center'] }>`
  height: ${({ center }) => (center ? '80%' : '10%')};
  align-items: center;
  justify-content: center;
`
interface HomeProps {
  navigation: any
  center?: boolean
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [getBooking, { data }] = useLazyQuery(GET_BOOKINGS)

  useFocusEffect(
    React.useCallback(() => {
      getBooking()
    }, [getBooking])
  )

  console.log(data)
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        {data && data.bookings.length > 0 && (
          <>
            <InfoText center={false}>
              <Heading text="Aktuella bokningar" />
            </InfoText>
            <Paragraph
              toLeft={true}
              small={true}
              text="Klicka på en transport för mer information"
            />
          </>
        )}
        {data && data.bookings.length > 0 ? (
          data.bookings.map((booking: any) => <BookingCard booking={booking} />)
        ) : (
          <InfoText center={true}>
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
