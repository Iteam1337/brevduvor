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
import { Picker } from 'react-native'
import Label from '~/components/form/Label'
import styled from 'styled-components/native'
import ScrollableLayout from '~/components/ScrollableLayout'

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

const PickerStyle = styled.Picker`
  width: 100%;
`

const Book: React.FC<BookProps> = ({ navigation }) => {
  const [fromValue, setFromValue] = React.useState('Slussfors')
  const { data, loading } = useQuery<Query, Destination>(GET_ALL_DESTINATIONS)
  const [startValue, setStartValue] = React.useState('')

  const [initDrone] = useMutation<Mutation['initDrone'], MutationInitDroneArgs>(
    INIT_DRONE,
    {
      variables: { start: storuman, stop: slussfors },
    }
  )

  return (
    <ScrollableLayout image={backgroundImage}>
      <Label value="Till" />
      <PickerStyle
        selectedValue={startValue}
        onValueChange={itemValue => {
          setStartValue(itemValue)
        }}
      >
        {!loading &&
          data &&
          data.allDestinations.map((destination: Destination) => (
            <Picker.Item label={destination.alias} value={destination} />
          ))}
      </PickerStyle>

      <Label value="Från" />
      <PickerStyle
        selectedValue={fromValue}
        onValueChange={itemValue => setFromValue(itemValue)}
      >
        <Picker.Item label="Slussfors" value="slussfors" />
        <Picker.Item label="Storuman" value="storuman" />
      </PickerStyle>
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
