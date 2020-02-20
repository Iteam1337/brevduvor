import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  MutationInitDroneArgs,
  Mutation,
  Destination,
  Query,
  DestinationInput,
} from '~/__generated__/app'
import { INIT_DRONE } from '~/graphql/mutations'
import { GET_ALL_DESTINATIONS } from '~/graphql/queries'
import PrimaryButton from '~/components/Button'
import ScrollableLayout from '~/components/ScrollableLayout'
import Select from '~/components/form/Select'
import ButtonWrapper from '~/components/ButtonWrapper'
import ContentWrapper from '~/components/ContentWrapper'
import TripIcon from '~/assets/Trip'
import Heading from '~/components/typography/Heading'
import BookingHeader from '~/components/BookingHeaderLayout'
import styled from 'styled-components/native'

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
  const { data } = useQuery<Query, Destination>(GET_ALL_DESTINATIONS)
  const [form, setForm] = React.useState<FormProps>({})

  const [initDrone] = useMutation<Mutation['initDrone'], MutationInitDroneArgs>(
    INIT_DRONE,
    {
      onCompleted: () => navigation.navigate('BookingEta'),
    }
  )

  const formDispatcher = (type: string) => (val: DestinationInput) =>
    form && setForm({ ...form, [type]: val })

  const handleDestination = () => {
    if (form && form.start && form.stop) {
      initDrone({
        variables: {
          start: form.start,
          stop: form.stop,
        },
      })
    }
  }

  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <BookingHeader>
          <Heading text="Boka transport" />
          <TripIcon />
        </BookingHeader>
        <SelectContainer>
          <Select.Geo
            label="Från"
            placeholder="Ange startposition"
            selectOptions={data?.allDestinations}
            callback={formDispatcher('start')}
          />

          <Select.Geo
            label="Till"
            selectOptions={data?.allDestinations}
            callback={formDispatcher('stop')}
            placeholder="Ange destination"
          />
        </SelectContainer>
      </ContentWrapper>
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
    </ScrollableLayout>
  )
}

export default Book
