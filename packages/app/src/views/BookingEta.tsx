import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Clock from '~/assets/Clock'
import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'
const backgroundImage = require('~/../assets/background-topo.png')

interface BookingEtaProps {
  navigation: any
}

const BookingEta: React.FC<BookingEtaProps> = ({ navigation }) => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <Heading text="Beräknad tid" />
        <Clock />
      </ContentWrapper>
      <ButtonWrapper>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Nästa"
          callback={() => navigation.navigate('BookingPacking')}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default BookingEta
