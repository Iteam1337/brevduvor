import { gql } from '@apollo/client'

export const HAS_STARTED = gql`
  subscription {
    hasStarted {
      id
    }
  }
`
