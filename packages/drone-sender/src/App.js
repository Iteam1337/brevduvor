import React from 'react'
import { useMutation, useSubscription, gql } from '@apollo/client'

const storuman = {
  alias: 'Storuman',
  lat: 65.1014345,
  lon: 17.0984889,
}

const slussfors = {
  alias: 'Slussfors',
  lat: 65.4308053,
  lon: 16.2569718,
}

const INIT_DRONE_MUTATION = gql`
  mutation initDrone($start: DestinationInput!, $stop: DestinationInput!) {
    initDrone(start: $start, stop: $stop)
  }
`

function App() {
  const [initDrone, { data }] = useMutation(INIT_DRONE_MUTATION)

  const handlePressSend = () => {
    initDrone({ variables: { start: storuman, stop: slussfors } })
  }

  console.log(data)

  return (
    <button onClick={handlePressSend} className="App">
      Hello
    </button>
  )
}

export default App
