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

const storuman = {
  alias: 'Storuman',
  lat: 65.1014345,
  lon: 17.0984889,
}

const slussfors = {
  alias: 'Slussfors2',
  lat: 65.4308053,
  lon: 16.2569718,
}

interface BookProps {
  navigation: any
}

const Book: React.FC<BookProps> = ({ navigation }) => {
  const { data } = useQuery<Query, Destination>(GET_ALL_DESTINATIONS)
  const [startValue, setStartValue] = React.useState(
    data && data?.allDestinations[0].alias
  )

  const [stopValue, setStopValue] = React.useState('Ange slutmål')

  const [initDrone] = useMutation<Mutation['initDrone'], MutationInitDroneArgs>(
    INIT_DRONE,
    {
      variables: {
        start: storuman,
        stop: slussfors,
      },
    }
  )

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
            initDrone()
            navigation.navigate('BookingEta')
          }}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default Book
