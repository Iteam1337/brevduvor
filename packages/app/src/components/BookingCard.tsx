import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Paragraph from '~/components/typography/Paragraph'
import translate from '~/utils/statusTranslation'

interface BookingEvent {
  __typename: string
  status: string
  created_at: string
}

interface BookingCardProps {
  title: string
  events: [BookingEvent]
  callback: () => void
}

const CardStyle = styled(TouchableOpacity)`
  background-color: white;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.NGrey7};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xsm};
  margin: 10px 0;
`

const BookingCard: React.FC<BookingCardProps> = ({
  title,
  events,
  callback,
}) => (
  <CardStyle onPress={callback}>
    <Paragraph text={title} />
    <Paragraph
      small={true}
      text={`Status: ${translate(events.slice(0).reverse()[0].status)}`}
    />
  </CardStyle>
)

export default BookingCard
