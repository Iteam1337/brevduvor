import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'
const backgroundImage = require('~/../assets/background-topo.png')
import BookingHeader from '~/components/BookingHeaderLayout'
import Confirm from '~/assets/Confirm'

interface ConfirmationProps {
  navigation: any
}

const Confirmation: React.FC<ConfirmationProps> = ({ navigation }) => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <BookingHeader>
          <Heading text="Bekräftelse" />
          <Confirm />
        </BookingHeader>
        <Paragraph text="Drönaren är nu på väg och mottagaren kommar att notifieras" />
        <Paragraph text="Ankomst beräknad 14:56" />
      </ContentWrapper>
      <ButtonWrapper>
        <PrimaryButton text="Ok" callback={() => navigation.navigate('Home')} />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default Confirmation
