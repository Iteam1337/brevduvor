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
import Trip from '~/assets/Trip'
import Heading from '~/components/typography/Heading'

const backgroundImage = require('~/../assets/background-topo.png')

interface BookProps {
  navigation: any
}

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
      initDrone({ variables: { start: start[0], stop: stop[0] } })
    }
  }

  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <Heading text="Boka transport" />
        <Trip />
        <InputSelect
          label="Från"
          name={startValue}
          placeholder="Välj från"
          selectOptions={data?.allDestinations}
          callback={setStartValue}
        />

        <InputSelect
          label="Till"
          name={stopValue}
          selectOptions={data?.allDestinations}
          callback={setStopValue}
          placeholder="Välj till"
        />
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
