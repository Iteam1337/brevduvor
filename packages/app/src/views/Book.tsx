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
import Label from '~/components/form/Label'
import styled from 'styled-components/native'
import ScrollableLayout from '~/components/ScrollableLayout'
import InputSelect from '~/components/form/InputSelect'

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

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
interface BookProps {
  navigation: any
}

const Book: React.FC<BookProps> = ({ navigation }) => {
  const { data } = useQuery<Query, Destination>(GET_ALL_DESTINATIONS)
  const [startValue, setStartValue] = React.useState(
    data?.allDestinations[0].alias
  )
  const [stopValue, setStopValue] = React.useState('Ange slutmål')

  const [initDrone] = useMutation<Mutation['initDrone'], MutationInitDroneArgs>(
    INIT_DRONE,
    {
      variables: { start: storuman, stop: slussfors },
    }
  )

  return (
    <ScrollableLayout image={backgroundImage}>
      <Label value="Från" />
      <InputSelect
        name={startValue}
        select={data?.allDestinations}
        callback={setStartValue}
      />
      <Label value="Till" />
      <InputSelect
        name={stopValue}
        select={data?.allDestinations}
        callback={setStopValue}
      />

      <ButtonGroup>
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
      </ButtonGroup>
    </ScrollableLayout>
  )
}

export default Book
