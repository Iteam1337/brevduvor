import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
import Package from '~/assets/Package'
import { ScrollableLayout } from '~/components/Layout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'
const backgroundImage = require('~/../assets/background-topo.png')

import BookingHeader from '~/components/BookingHeaderLayout'
import { useMutation } from '@apollo/client'
import {
  Status,
  Mutation,
  MutationUpdateBookingStatusArgs,
} from '~/__generated__/app'
import { UPDATE_BOOKING_STATUS } from '~/graphql/mutations'

interface BookingPackingProps {
  navigation: any
  route: any
}

const BookingPacking: React.FC<BookingPackingProps> = ({
  navigation,
  route,
}) => {
  const { bookingId } = route.params

  const [updatebookingStatus] = useMutation<
    Mutation['updateBookingStatus'],
    MutationUpdateBookingStatusArgs
  >(UPDATE_BOOKING_STATUS, {
    variables: { bookingId, status: 'PACKED' as Status },
    onCompleted: () => navigation.navigate('BookingSend', { bookingId }),
  })
  return (
    <ContentWrapper>
      <ScrollableLayout image={backgroundImage}>
        <BookingHeader>
          <Heading text="Packa ditt paket" />
          <Package />
        </BookingHeader>
        <Paragraph text="Märk dina varor och paketera dem väl." />
      </ScrollableLayout>
      <ButtonWrapper>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton text="Nästa" callback={() => updatebookingStatus()} />
      </ButtonWrapper>
    </ContentWrapper>
  )
}

export default BookingPacking
