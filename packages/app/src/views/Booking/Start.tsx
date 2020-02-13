import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  MutationInitDroneArgs,
  Mutation,
  Destination,
  Query,
} from '~/__generated__/app'
import { INIT_DRONE } from '~/graphql/mutations'
import { GET_ALL_DESTINATIONS } from '~/graphql/queries'
import PrimaryButton from '~/components/Button'
import ScrollableLayout from '~/components/ScrollableLayout'
import InputSelect from '~/components/form/InputSelect'
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

const Book: React.FC<BookProps> = ({ navigation }) => {
  const { data } = useQuery<Query, Destination>(GET_ALL_DESTINATIONS)
  const [startValue, setStartValue] = React.useState<string>('')

  const [stopValue, setStopValue] = React.useState<string>('')

  const [initDrone] = useMutation<Mutation['initDrone'], MutationInitDroneArgs>(
    INIT_DRONE,
    {
      onCompleted: () => navigation.navigate('BookingEta'),
    }
  )

  const handleDestination = () => {
    const start = data?.allDestinations.filter(a => a.alias === startValue)
    const stop = data?.allDestinations.filter(b => b.alias === stopValue)

    if (start && stop) {
      initDrone({
        variables: {
          start: {
            alias: start[0].alias,
            lon: start[0].lon,
            lat: start[0].lat,
          },
          stop: { alias: stop[0].alias, lon: stop[0].lon, lat: stop[0].lat },
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
          <InputSelect
            label="Från"
            name={startValue}
            placeholder="Ange startposition"
            selectOptions={data?.allDestinations}
            callback={setStartValue}
          />

          <InputSelect
            label="Till"
            name={stopValue}
            selectOptions={data?.allDestinations}
            callback={setStopValue}
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
