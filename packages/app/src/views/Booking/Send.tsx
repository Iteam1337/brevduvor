import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
import SendIcon from '~/assets/Send'
import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'
import { START_DRONE } from '~/graphql/mutations'
import { useMutation } from '@apollo/client'
import { Mutation, MutationStartDroneArgs } from '~/__generated__/app'
import BookingHeader from '~/components/BookingHeaderLayout'
const backgroundImage = require('~/../assets/background-topo.png')

interface BookingSendProps {
  navigation: any
}

const BookingSend: React.FC<BookingSendProps> = ({ navigation }) => {
  const [startDrone] = useMutation<
    Mutation['startDrone'],
    MutationStartDroneArgs
  >(START_DRONE, {
    variables: { id: 'b229e5ac-488e-4dd4-98ad-4420012fd6bf' },
    onCompleted: () => navigation.navigate('BookingConfirmation'),
  })
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <BookingHeader>
          <Heading text="Skicka din drönare" />
          <SendIcon />
        </BookingHeader>
        <Paragraph text="Drönaren är nu förberedd och redo för avfärd." />
        <Paragraph text="Bekräfta för att starta färd" />
      </ContentWrapper>
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
    </ScrollableLayout>
  )
}

export default BookingSend
