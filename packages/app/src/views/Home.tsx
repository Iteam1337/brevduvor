import React from 'react'
import { useMutation } from '@apollo/client'
import { MutationInitDroneArgs, Mutation } from '~/__generated__/app'
import { INIT_DRONE } from '~/graphql/mutations'
import PrimaryButton from '~/components/Button'
import TextInput from '~/components/form/Input'
import Label from '~/components/form/Label'
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

const Home = () => {
  const [] = useMutation<Mutation['initDrone'], MutationInitDroneArgs>(
    INIT_DRONE,
    {
      variables: { start: storuman, stop: slussfors },
    }
  )
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

      <PrimaryButton callback={() => console.log('do something')} text="Boka" />
      <PrimaryButton
        isCancel={true}
        callback={() => console.log('do something')}
        text="Boka"
      />
    </ScrollableLayout>
  )
}

export default Home
