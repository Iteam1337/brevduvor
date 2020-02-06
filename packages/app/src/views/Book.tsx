import React from 'react'
import { useMutation } from '@apollo/client'
import { MutationInitDroneArgs, Mutation } from '~/__generated__/app'
import { INIT_DRONE } from '~/graphql/mutations'
import PrimaryButton from '~/components/Button'
import Layout from '~/components/Layout'
import { Picker } from 'react-native'
import Label from '~/components/form/Label'
import styled from 'styled-components/native'

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
  const [toValue, setToValue] = React.useState('Storuman')
  const [initDrone] = useMutation<Mutation['initDrone'], MutationInitDroneArgs>(
    INIT_DRONE,
    {
      variables: { start: storuman, stop: slussfors },
    }
  )

  return (
    <Layout image={backgroundImage}>
      <Label value="Till" />
      <PickerStyle
        selectedValue={toValue}
        style={{ width: 100 }}
        onValueChange={itemValue => setToValue(itemValue)}
      >
        <Picker.Item label="Slussfors" value="slussfors" />
        <Picker.Item label="Storuman" value="storuman" />
      </PickerStyle>

      <Label value="Från" />
      <PickerStyle
        selectedValue={fromValue}
        style={{ width: 100 }}
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
    </Layout>
  )
}

export default Book
