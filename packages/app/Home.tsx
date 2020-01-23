import React from 'react'

import { SafeAreaView, Button } from 'react-native'

import { useMutation } from '@apollo/client'
import { INIT_DRONE } from './graphql/mutations'
import { MutationInitDroneArgs, Mutation } from '__generated__/app'

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

  return (
    <SafeAreaView>
      <Button onPress={() => initDrone()} title="submit" />
    </SafeAreaView>
  )
}

export default Home
