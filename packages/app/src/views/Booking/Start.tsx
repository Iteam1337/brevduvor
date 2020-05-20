import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  Mutation,
  Destination,
  Query,
  DestinationInput,
  MutationBookingArgs,
} from '~/__generated__/app'
import { BOOKING } from '~/graphql/mutations'
import { GET_ALL_DESTINATIONS } from '~/graphql/queries'
import PrimaryButton from '~/components/Button'
import { ScrollableLayout } from '~/components/Layout'
import Select from '~/components/form/Select'
import ButtonWrapper from '~/components/ButtonWrapper'
import ContentWrapper from '~/components/ContentWrapper'
import TripIcon from '~/assets/Trip'
// import Heading from '~/components/typography/Heading'
import BookingHeader from '~/components/BookingHeaderLayout'
import styled from 'styled-components/native'
import { UserContext } from '~/AppContext'

const backgroundImage = require('~/../assets/background-topo.png')

interface BookProps {
  navigation: any
}

const SelectContainer = styled.View`
  width: 100%;
`
interface FormProps {
  start?: DestinationInput
  stop?: DestinationInput
}

const Book: React.FC<BookProps> = ({ navigation }) => {
  const { data: destinations } = useQuery<Query, Destination>(
    GET_ALL_DESTINATIONS
  )
  const [form, setForm] = React.useState<FormProps>({})

  const [createBooking] = useMutation<
    { booking: Mutation['booking'] },
    MutationBookingArgs
  >(BOOKING, {
    onCompleted: ({ booking: bookingId }) =>
      navigation.navigate('BookingPacking', { bookingId }),
  })

  const { user } = React.useContext<any>(UserContext)

  const formDispatcher = (type: string) => (val: DestinationInput) =>
    form && setForm({ ...form, [type]: val })

  const handleDestination = () => {
    if (form && form.start && form.stop === form.start) {
      return
    }
    if (form && form.start && form.stop) {
      createBooking({
        variables: {
          start: form.start,
          stop: form.stop,
        },
      })
    }
  }

  return (
    <ContentWrapper>
      <ScrollableLayout image={backgroundImage}>
        <BookingHeader>
          {/* <Heading text="Boka transport" /> */}
          <TripIcon />
        </BookingHeader>
        <SelectContainer>
          <Select.Geo
            label="Från"
            defaultValue={user.destination.alias}
            placeholder="Ange startposition"
            selectOptions={destinations?.allDestinations}
            callback={formDispatcher('start')}
          />

          <Select.Geo
            label="Till"
            selectOptions={destinations?.allDestinations}
            callback={formDispatcher('stop')}
            placeholder="Ange destination"
          />
        </SelectContainer>
      </ScrollableLayout>
      <ButtonWrapper>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Nästa"
          callback={() => {
            handleDestination()
          }}
        />
      </ButtonWrapper>
    </ContentWrapper>
  )
}

export default Book
