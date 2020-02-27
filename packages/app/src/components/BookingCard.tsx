import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Paragraph from '~/components/typography/Paragraph'
import Icons from '~/assets/Icons'
interface BookingCardProps {
  booking: {
    __typename: string
    status: string
    start: {
      __typename: string
      alias: string
    }
    stop: { __typename: string; alias: string }
    eta: string
  }
  callback: () => void
}

const CardStyle = styled(TouchableOpacity)`
  background-color: white;
  width: 105%;
  border: 1px solid ${({ theme }) => theme.colors.NGrey7};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xsm};
  margin: 10px 0;
`

const TimeWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`

const BookingCard: React.FC<BookingCardProps> = ({ booking, callback }) => {
  return (
    <CardStyle onPress={callback}>
      <Paragraph text={`${booking.start.alias} - ${booking.stop.alias}`} />
      <TimeWrapper>
        <Icons.Clock small={true} />
        <Paragraph
          small={true}
          text={`${booking.eta} - beräknad ankomst ${booking.eta}`}
        />
      </TimeWrapper>
    </CardStyle>
  )
}

export default BookingCard
