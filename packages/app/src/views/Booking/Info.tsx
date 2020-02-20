import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'
const backgroundImage = require('~/../assets/background-topo.png')
import styled from 'styled-components/native'

interface BookingInfoProps {
  navigation: any
  route: any
  center: boolean
}

export const InfoText = styled.View<{ center: BookingInfoProps['center'] }>`
  height: ${({ center }) => (center ? '80%' : '10%')};
  align-items: center;
  justify-content: center;
`

const BookingInfo: React.FC<BookingInfoProps> = ({ route, navigation }) => {
  const { booking } = route.params

  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <InfoText>
          <Heading text="Status" />
        </InfoText>
        <Paragraph
          toLeft={true}
          text={`Rutt: ${booking.start.alias} - ${booking.start.alias}`}
        />
      </ContentWrapper>
      <ButtonWrapper>
        <PrimaryButton
          text="Tillbaka"
          callback={() => navigation.navigate('Home')}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default BookingInfo
