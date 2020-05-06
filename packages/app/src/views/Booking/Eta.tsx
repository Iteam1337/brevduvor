import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
import ClockIcon from '~/assets/Clock'
import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'
const backgroundImage = require('~/../assets/background-topo.png')
import BookingHeader from '~/components/BookingHeaderLayout'

interface BookingEtaProps {
  navigation: any
  route: any
}

const BookingEta: React.FC<BookingEtaProps> = ({ route, navigation }) => {
  const { bookingId } = route.params
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <BookingHeader>
          <Heading text="Beräknad tidsåtgång" />
          <ClockIcon />
        </BookingHeader>
        <Paragraph text="Beräknad tidsåtgång för transport är XX min." />
      </ContentWrapper>
      <ButtonWrapper>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Nästa"
          callback={() => navigation.navigate('BookingPacking', { bookingId })}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default BookingEta
