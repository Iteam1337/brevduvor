import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Package from '~/assets/Package'
import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'

const backgroundImage = require('~/../assets/background-topo.png')

interface BookingPackingProps {
  navigation: any
}

const BookingPacking: React.FC<BookingPackingProps> = ({ navigation }) => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <Heading text="Packa ditt paket" />
        <Package />
      </ContentWrapper>

      <ButtonWrapper>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Nästa"
          callback={() => navigation.navigate('BookingSend')}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default BookingPacking
