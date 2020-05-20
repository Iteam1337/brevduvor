import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
import { ScrollableLayout } from '~/components/Layout'
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
    <ContentWrapper>
      <ScrollableLayout image={backgroundImage}>
        <BookingHeader>
          <Heading text="Bekräftelse" />
          <Confirm />
        </BookingHeader>
        <Paragraph text="Drönaren är nu på väg och mottagaren kommar att notifieras" />
      </ScrollableLayout>
      <ButtonWrapper>
        <PrimaryButton text="Ok" callback={() => navigation.navigate('Home')} />
      </ButtonWrapper>
    </ContentWrapper>
  )
}

export default Confirmation
