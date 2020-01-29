import React from 'react'

import { SafeAreaView } from 'react-native'

import { useMutation } from '@apollo/client'
import { INIT_DRONE } from './graphql/mutations'
import { MutationInitDroneArgs, Mutation } from '__generated__/app'
import styled from 'styled-components/native'

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
      <ButtonContainer onPress={() => initDrone()}>
        <ButtonText>Send drone</ButtonText>
      </ButtonContainer>
    </SafeAreaView>
  )
}

const ButtonContainer = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.black};
`

const ButtonText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`
export default Home
