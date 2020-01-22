import React from 'react'
import { useSubscription, gql } from '@apollo/client'

const HAS_STARTED_NOTIFICATION = gql`
  subscription hasStartedNotification {
    landingNotification {
      id
    }
  }
`

function App() {
  const { data, loading, error } = useSubscription(HAS_STARTED_NOTIFICATION)
  return <div className="App">Receiver</div>
}

export default App
