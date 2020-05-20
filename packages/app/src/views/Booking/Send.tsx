import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
import SendIcon from '~/assets/Send'
import { ScrollableLayout } from '~/components/Layout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'
import { START_DRONE } from '~/graphql/mutations'
import { useMutation } from '@apollo/client'
import { Mutation, MutationStartDroneArgs } from '~/__generated__/app'
import BookingHeader from '~/components/BookingHeaderLayout'
const backgroundImage = require('~/../assets/background-topo.png')

interface BookingSendProps {
  navigation: any
  route: any
}

const BookingSend: React.FC<BookingSendProps> = ({ navigation, route }) => {
  const { bookingId } = route.params
  const [startDrone] = useMutation<
    Mutation['startDrone'],
    MutationStartDroneArgs
  >(START_DRONE, {
    variables: { bookingId },
    onCompleted: () => navigation.navigate('BookingConfirmation'),
  })

  return (
    <ContentWrapper>
      <ScrollableLayout image={backgroundImage}>
        <BookingHeader>
          <Heading text="Skicka din drönare" />
          <SendIcon />
        </BookingHeader>
        <Paragraph text="Drönaren är nu förberedd och redo för avfärd." />
        <Paragraph text="Bekräfta för att starta färd" />
      </ScrollableLayout>
      <ButtonWrapper>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Bekräfta"
          callback={() => {
            startDrone()
          }}
        />
      </ButtonWrapper>
    </ContentWrapper>
  )
}

export default BookingSend
