import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
import Package from '~/assets/Package'
import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'
const backgroundImage = require('~/../assets/background-topo.png')

import BookingHeader from '~/components/BookingHeaderLayout'

interface BookingPackingProps {
  navigation: any
  route: any
}

const BookingPacking: React.FC<BookingPackingProps> = ({
  navigation,
  route,
}) => {
  const { bookingId } = route.params
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <BookingHeader>
          <Heading text="Packa ditt paket" />
          <Package />
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
          callback={() => navigation.navigate('BookingSend', { bookingId })}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default BookingPacking
