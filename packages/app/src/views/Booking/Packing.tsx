import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'
const backgroundImage = require('~/../assets/background-topo.png')

import BookingHeader from '~/components/BookingHeaderLayout'
import Icons from '~/assets/Icons'

interface BookingPackingProps {
  navigation: any
}

const BookingPacking: React.FC<BookingPackingProps> = ({ navigation }) => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <BookingHeader>
          <Heading text="Packa ditt paket" />
          <Icons.Package />
        </BookingHeader>
        <Paragraph text="Märk dina varor och paketera dem väl. Kom ihåg att..." />
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
