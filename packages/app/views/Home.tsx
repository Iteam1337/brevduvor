import React from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { INIT_DRONE } from '../graphql/mutations'
import { MutationInitDroneArgs, Mutation } from '__generated__/app'
import PrimaryButton from '../components/Button'
import TextInput from '../components/form/Input'
import Label from '../components/form/Label'
import ScrollableLayout from '../components/ScrollableLayout'
import { HAS_STARTED } from '../graphql/subscriptions'
import { Text } from 'react-native'

const backgroundImage = require('../assets/background-topo.png')

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

const Home = () => {
  const [initDrone] = useMutation<Mutation['initDrone'], MutationInitDroneArgs>(
    INIT_DRONE,
    {
      variables: { start: storuman, stop: slussfors },
    }
  )
  const { data, loading } = useSubscription(HAS_STARTED)

  return (
    <ScrollableLayout image={backgroundImage}>
      <Label value="Från" />
      <TextInput
        value="input1"
        placeholder="write something"
        callback={console.log}
      />
      <Label value="Till" />
      <TextInput
        value="input2"
        placeholder="write something"
        callback={console.log}
      />
      {!loading && <Text>{data.id} drone has started</Text>}

      <PrimaryButton callback={() => initDrone()} text="Boka" />
      <PrimaryButton
        isCancel={true}
        callback={() => console.log('do something')}
        text="Boka"
      />
    </ScrollableLayout>
  )
}

export default Home
